import { ContextualMenu, IContextualMenuItem, memoizeFunction, mergeStyleSets, SearchBox } from "@fluentui/react";
import { useEventCallback } from "@fluentui/react-hooks";
import * as React from "react";

import { registerClearIcon, registerSearchIcon } from "@/Common/IconRegistration";
import { flex } from "@/Common/Styles/Flex";

export interface IDropdownSearchProps {
    width: number;
    items: IContextualMenuItem[];
    placeholder?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    maxHeight?: number;
}

registerSearchIcon();
registerClearIcon();

const getStyles = memoizeFunction((width: number) =>
    mergeStyleSets({
        root: {
            width,
        },
        box: {
            width: "100%",
            ".ms-SearchBox-icon, .ms-Button-icon": {
                ...flex({
                    justifyContent: "center",
                    alignItems: "center",
                }),
            },
        },
    }),
);

export const DropdownSearch: React.FC<IDropdownSearchProps> = props => {
    const { width, items, onSearch, onChange, maxHeight } = props;

    const styles = getStyles(width);

    const searchBoxRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = React.useState(true);
    const [value, setValue] = React.useState("");

    const onSearchBoxChange = useEventCallback((e: unknown, value: string) => {
        setValue(value);
        setHidden(!value);
        onChange && onChange(value);
    });
    const onItemClick = useEventCallback(() => {
        setHidden(true);
        onSearchBoxChange(null, "");
    });
    const onSearchBoxSearch = useEventCallback((value: string) => {
        value && onSearch(value);
    });

    // Fuck tab focus!
    const tabFlag = React.useRef(true);
    const onSearchBoxKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!dropdownRef.current) return;
        if (e.key === "Tab") {
            if (tabFlag.current) {
                const items = dropdownRef.current.querySelectorAll(
                    ".ms-ContextualMenu-link",
                ) as unknown as HTMLButtonElement[];
                if (items.length) {
                    tabFlag.current = false;
                    e.preventDefault();
                    items[e.shiftKey ? items.length - 1 : 0].focus();
                    items[e.shiftKey ? 0 : items.length - 1].onkeydown = ev => {
                        if (ev.shiftKey === e.shiftKey && ev.key === "Tab") {
                            ev.preventDefault();
                            searchBoxRef.current?.getElementsByTagName?.("input")?.[0]?.focus();
                        }
                    };
                }
            } else {
                tabFlag.current = true;
            }
        }
    });

    return (
        <div className={styles.root}>
            <SearchBox
                ref={searchBoxRef}
                className={styles.box}
                value={value}
                onChange={onSearchBoxChange}
                onSearch={onSearchBoxSearch}
                onClick={() => setHidden(false)}
                onClear={() => setHidden(true)}
                showIcon={true}
                onKeyDown={onSearchBoxKeyDown}
            />
            <ContextualMenu
                ref={dropdownRef}
                items={items}
                hidden={hidden}
                target={searchBoxRef}
                calloutProps={{ styles: { root: { width: width } }, calloutMaxHeight: maxHeight }}
                shouldFocusOnMount={false}
                onItemClick={onItemClick}
                onDismiss={() => setHidden(true)}
            />
        </div>
    );
};
