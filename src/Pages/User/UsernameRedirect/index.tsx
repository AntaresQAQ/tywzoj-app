import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CE_Page } from "@/Common/Enums/PagePath";
import { IPageParams } from "@/Common/Types/PageParams";
import { makeUrl } from "@/Common/Utilities/Url";
import { getUserSearchByUsernameRequestAsync } from "@/Pages/User/UsernameRedirect/Request";

export const UsernameRedirect: React.FC = () => {
    const { username } = useParams<IPageParams[CE_Page.UsernameRedirect]>();
    const navigate = useNavigate();

    React.useEffect(() => {
        getUserSearchByUsernameRequestAsync(username).then((id) => {
            id && navigate(makeUrl({ page: CE_Page.UserDetail, params: { id } }));
        });
    }, [navigate, username]);

    return null;
};
