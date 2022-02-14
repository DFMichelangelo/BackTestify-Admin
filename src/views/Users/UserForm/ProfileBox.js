import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFormUtils from "hooks/useFormUtils";
import "./style.scss";

function ProfileBox(props) {
  const { isNew } = useFormUtils();
  const { formikUser } = props
  const { t } = useTranslation();

  return (
    <Card id="userFormPersonalInformationBox">
      <CardHeader title={t("profile.personalInformation")} />

      <CardContent>
        <div className="flex flex-col">
          <TextField
            id="firstname"
            label={t("profile.firstname")}
            variant="filled"
            onChange={formikUser.handleChange}
            value={formikUser.values?.firstname || ""}
          />

          <TextField
            id="lastname"
            label={t("profile.lastname")}
            variant="filled"
            onChange={formikUser.handleChange}
            value={formikUser.values?.lastname || ""}
          />
          <TextField
            id="email"
            error={Boolean(formikUser.errors.email)}
            helperText={t(formikUser.errors.email)}
            onBlur={formikUser.handleBlur}
            label="Email"
            variant="filled"
            onChange={formikUser.handleChange}
            value={formikUser.values.email || ""}
          />

          <TextField
            id="password"
            label="Password"
            variant="filled"
            onChange={formikUser.handleChange}
            value={formikUser.values.password || ""}
            error={
              formikUser.touched.password && Boolean(formikUser.errors.password)
            }
            helperText={
              formikUser.touched.password &&
              t(formikUser.errors.password)
            }
            onBlur={formikUser.handleBlur}
          />

          {!isNew() && <>
            <TextField
              disabled
              id="createdAt"
              label={t("users.createdAt")}
              variant="filled"
              onChange={formikUser.handleChange}
              value={formikUser.values.createdAt}
            />

            <TextField
              disabled
              id="updatedAt"
              label={t("users.updatedAt")}
              variant="filled"
              onChange={formikUser.handleChange}
              value={formikUser.values.updatedAt}
            />
          </>
          }


          <FormControl variant="filled">
            <InputLabel shrink >
              {t("users.role")}
            </InputLabel>
            <Select
              name="role"
              value={formikUser.values.role}
              onChange={formikUser.handleChange}

            >
              <MenuItem value={"BASE"}>Base</MenuItem>
              <MenuItem value={"ADMIN"}>Admin</MenuItem>
              <MenuItem value={"SUPERADMIN"}>Super Admin</MenuItem>
            </Select>
          </FormControl>


          <FormControl variant="filled">
            <InputLabel shrink >
              {t("users.status")}
            </InputLabel>
            <Select
              name="status"
              value={formikUser.values.status}
              onChange={formikUser.handleChange}

            >
              <MenuItem value={"ACTIVE"}>  {t("users.active")}</MenuItem>
              <MenuItem value={"PENDING"}> {t("users.pending")}</MenuItem>
              <MenuItem value={"DISABLED"}>{t("users.disabled")}</MenuItem>
            </Select>
          </FormControl>

        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileBox;
