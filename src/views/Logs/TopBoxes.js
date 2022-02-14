import React from "react";
import "./style.scss";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DateTime } from "luxon"
import FieldAndValue from 'components/FieldAndValue'
function TopBoxes(props) {
    const { t } = useTranslation();
    const { startDate, endDate, amountOfDataKept } = props
    return (
        <Card id="logsTopBoxes">
            <CardHeader title={t("logs.information")} />
            <CardContent>
                <div id="logsInformationContent" className=" flex justify-between">
                    <FieldAndValue
                        field="logs.startDate"
                        value={DateTime.fromMillis(startDate).toLocaleString()}
                    />

                    <FieldAndValue
                        field="logs.endDate"
                        value={DateTime.fromMillis(endDate).toLocaleString()}
                    />

                    <FieldAndValue
                        field="logs.amountOfDataKept"
                        value={
                            <>
                                {amountOfDataKept}{" "}
                                {t("logs.days")}
                            </>
                        }
                    />
                </div>
            </CardContent>
        </Card >
    );
}

export default TopBoxes;
