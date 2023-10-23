import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useLocation } from "react-router-dom";

export function AppBreadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x).slice(0, -1);
    return (<Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((value, i) => {
            return (
                <Link to={`/${value}`}>
                    {capitalizeFirstLetter(value)}
                </Link>
            );
        })}

    </Breadcrumbs>);
}
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
