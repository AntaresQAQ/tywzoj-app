import { IContextualMenuItem, Persona, PersonaSize } from "@fluentui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { DropdownSearch } from "@/Common/Components/DropdownSearch";
import { CE_Page } from "@/Common/Enums/PagePath";
import { useGravatar } from "@/Common/Hooks/Gravatar";
import { makeUrl } from "@/Common/Utilities/Url";
import { useAppDispatch, useAppSelector } from "@/Features/Store";

import { searchUserAction, setUserListPage } from "./Action";
import { getUserSearchResult } from "./Selectors";

export const UserListSearch: React.FC = () => {
    const searchResult = useAppSelector(getUserSearchResult);
    const gravatar = useGravatar(32);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const items: IContextualMenuItem[] = searchResult.map((user) => ({
        key: user.id.toString(),
        onRenderContent: () => (
            <Persona size={PersonaSize.size32} text={user.username} imageUrl={user.avatar && gravatar(user.avatar)} />
        ),
        onClick: () => navigate(makeUrl({ page: CE_Page.UserDetail, params: { id: user.id } })),
    }));

    const debounceTimeout = React.useRef<number>(null);

    // Clear timeout while the component is being unmounted
    React.useEffect(() => () => debounceTimeout.current && clearTimeout(debounceTimeout.current), []);

    const onSearchBoxChange = React.useCallback(
        (keywords: string) => {
            debounceTimeout.current && clearTimeout(debounceTimeout.current);

            if (keywords) {
                debounceTimeout.current = setTimeout(() => {
                    debounceTimeout.current = null;
                    dispatch(searchUserAction(keywords));
                }, 300);
            } else {
                dispatch(
                    setUserListPage({
                        userSearchResults: [],
                    }),
                );
            }
        },
        [dispatch],
    );

    const onSearchBoxSearch = React.useCallback(
        (value: string) => {
            dispatch(
                setUserListPage({
                    userSearchResults: [],
                }),
            );
            navigate(
                makeUrl({
                    page: CE_Page.UsernameRedirect,
                    params: { username: value },
                }),
            );
        },
        [dispatch, navigate],
    );

    return (
        <DropdownSearch
            width={250}
            maxHeight={300}
            items={items}
            onChange={onSearchBoxChange}
            onSearch={onSearchBoxSearch}
        />
    );
};
