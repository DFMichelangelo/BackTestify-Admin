import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Trans } from "react-i18next";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFormUtils from "hooks/useFormUtils";
import "./style.scss";

function ProfileBox(props) {
  const { isNew } = useFormUtils();
  const { formikUser } = props

  return (
    <Card id="userFormPersonalInformationBox">
      <CardHeader title={<Trans>profile.personalInformation</Trans>} />

      <CardContent>
        <div className="flex flex-col">
          <TextField
            id="firstname"
            label={<Trans>profile.firstname</Trans>}
            variant="filled"
            onChange={formikUser.handleChange}
            value={formikUser.values?.firstname || ""}
          />

          <TextField
            id="lastname"
            label={<Trans>profile.lastname</Trans>}
            variant="filled"
            onChange={formikUser.handleChange}
            value={formikUser.values?.lastname || ""}
          />
          <TextField
            id="email"
            error={Boolean(formikUser.errors.email)}
            helperText={<Trans>{formikUser.errors.email}</Trans>}
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
              formikUser.touched.password && (
                <Trans>{formikUser.errors.password}</Trans>
              )
            }
            onBlur={formikUser.handleBlur}
          />

          {!isNew() && <>
            <TextField
              disabled
              id="createdAt"
              label={<Trans>users.createdAt</Trans>}
              variant="filled"
              onChange={formikUser.handleChange}
              value={formikUser.values.createdAt}
            />

            <TextField
              disabled
              id="updatedAt"
              label={<Trans>users.updatedAt</Trans>}
              variant="filled"
              onChange={formikUser.handleChange}
              value={formikUser.values.updatedAt}
            />
          </>
          }


          <FormControl variant="filled">
            <InputLabel shrink >
              <Trans>users.role</Trans>
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
              <Trans>users.status</Trans>
            </InputLabel>
            <Select
              name="status"
              value={formikUser.values.status}
              onChange={formikUser.handleChange}

            >
              <MenuItem value={"ACTIVE"}><Trans>users.active</Trans></MenuItem>
              <MenuItem value={"PENDING"}><Trans>users.pending</Trans></MenuItem>
              <MenuItem value={"DISABLED"}><Trans>users.disabled</Trans></MenuItem>
            </Select>
          </FormControl>

        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileBox;
