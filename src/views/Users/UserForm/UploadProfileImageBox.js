import React, { useState } from "react";
import { Card, CardContent, CardHeader, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Typography from "@mui/material/Typography";
import "./style.scss";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";

import useFormUtils from "hooks/useFormUtils";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  input: {
    display: "none",
  },
}));

function UploadProfileImageBox(props) {
  const { formikUser, setImageFileForForm } = props
  const classes = useStyles();
  const [image, setImage] = useState(formikUser.values.profileImageUrl && process.env.REACT_APP_API_URL + "/public/" + formikUser.values.profileImageUrl)
  const { isNew } = useFormUtils();
  const { t } = useTranslation();
  const handleUploadClick = (event) => {
    if (event?.target?.files[0]) {
      let file = event.target.files[0];
      const reader = new FileReader();
      setImage(URL.createObjectURL(event?.target?.files[0]))
      setImageFileForForm(file)
      //formikUser.setFieldValue("profileImageUrl", undefined)
      if (!isNew()) formikUser.setFieldValue("removeProfileImageUrl", false)

      reader.onloadend = function (e) {

      }
    }
  };

  return (
    <Card id="uploadProfileImageBox">
      <CardHeader title={t("profile.profileImage")} />
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="flex relative">
            <Avatar
              className={classes.large}
              src={image}
            ></Avatar>
            <div className=" ml-24 absolute">
              {image && (
                <IconButton
                  onClick={() => {
                    if (!isNew()) formikUser.setFieldValue("removeProfileImageUrl", true)
                    //formikUser.setFieldValue("profileImageUrl", null)
                    setImage(null)
                  }}
                >
                  <DeleteOutlineOutlinedIcon color="primary" />
                </IconButton>
              )}
            </div>
          </div>
          <div className="mt-4 mb-2 flex flex-col justify-center">
            <Button color="primary" variant="outlined" component="label">
              <input
                accept="image/*"
                className={classes.input}
                id="profileImageUrl"
                name="profileImageUrl"
                type="file"
                onChange={(e) => {
                  handleUploadClick(e);
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              {t("profile.upload")}
            </Button>
          </div>
          <div className="mt-2 mb-2 flex justify-center">
            <Typography color="textSecondary" variant="body1">
              {t("profile.uploadImageText")}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UploadProfileImageBox;
