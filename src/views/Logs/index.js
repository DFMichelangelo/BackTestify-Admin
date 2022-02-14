import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import TopBoxes from "./TopBoxes"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Card, Chip } from "@mui/material";
import "./style.scss";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

function LogsList(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
    const loadData = async () => {
        try {
            await fetch({
                url: Endpoints.logs.getAll,
                method: "GET",
            })
        }
        catch (e) {

        }
    }
    useEffect(() => {
        themeContext.setTitle("logs.logs", <AssignmentOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "timestamp",
            label: "Timestamp",
        },
        {
            id: "level",
            label: "logs.level",
            helpText: "logs.levelHelperText",
        },
        {
            id: "module",
            label: "logs.module",
        },
        {
            id: "message",
            label: "logs.message",
        },
        {
            id: "object",
            label: "logs.object",
        },
    ]


    if (loading) return <RoundLoader />
    const rows = data.logs.map(log => {
        return {
            id: log.id,
            timestamp: {
                value: log.timestamp
            },
            level: {
                value: log.level
            },
            module: {
                value: log.module,
                component: <Chip size="small" style={{ backgroundColor: log.bgColor }} label={log.module} />
            },
            message: {
                value: log.message,
                maxCharacters: 100
            },
            object: {
                value: log.object,
                maxCharacters: 100
            },
            collapsible: {
                message: {
                    value: log.message,
                },
                object: {
                    value: log.object,
                },
            }
        }
    }).reverse()

    return (
        <div className="flex flex-col">
            <TopBoxes
                startDate={data.startDate}
                endDate={data.endDate}
                amountOfDataKept={data?.keep?.amount}
            />
            <Card id="logsTable">
                <EnhancedTable
                    headCells={headCells}
                    rows={rows}
                    rowsPerPage={25}
                    dense
                    readOnly
                    collapsible={true}
                    collapsibleTitle={"logs.details"}
                    collapsibleType="INFORMATION"
                    collapsibleHeadCells={headCells}
                    collapsibleHeadIconsAndDescription={[
                        {
                            icon: <MessageOutlinedIcon />,
                            label: "logs.message",
                            id: "message"
                        },
                        {
                            icon: <SearchOutlinedIcon />,
                            label: "logs.object",
                            id: "object"
                        }
                    ]}
                />
            </Card>

        </div>
    );
}

export default LogsList;
