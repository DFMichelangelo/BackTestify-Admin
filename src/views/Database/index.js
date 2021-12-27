import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { Trans } from "react-i18next";
import "./style.scss";
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import { Card, CardContent, CardHeader, Box, Typography } from "@mui/material";
import FieldAndValue from 'components/FieldAndValue'

function Database(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();

    const loadData = async () => {
        try {
            await fetch({
                url: Endpoints.database.tablesSize,
                method: "GET",
            })
        }
        catch (e) {
        }
    }

    useEffect(() => {
        themeContext.setTitle("database.database", <StorageOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "table_name",
            label: <Trans>database.tableName</Trans>,
        },
        {
            id: "pg_size_pretty",
            label: <Trans>database.size</Trans>,
        },
    ]


    if (loading) return <RoundLoader />
    const rows = data.map(table => {
        return {
            id: table.table_name,
            table_name: {
                value: table.table_name,
            },
            pg_size_pretty: {
                value: table.pg_size_pretty,
            },
        }
    })

    return (
        <div className="flex flex-col">
            <Card id="databaseInformationBox">
                <CardHeader title={<Trans>database.information</Trans>} />
                <CardContent>
                    <FieldAndValue
                        field="database.totalTablesSize"
                        value={
                            <>
                                {data.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.pg_total_relation_size), 0) / 1024 / 1024 / 1024} Gb
                            </>
                        }
                    />
                </CardContent>
            </Card>
            <Card id="databaseTableSizeTable">
                <EnhancedTable
                    headCells={headCells}
                    rows={rows}
                    readOnly
                    showFilters={false}
                    showSearchbar={false}
                    title={<Trans>database.tablesSize</Trans>}
                />
            </Card>
        </div>
    );
}

export default Database;