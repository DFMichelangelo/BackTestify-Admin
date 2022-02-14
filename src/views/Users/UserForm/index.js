import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import useFormUtils from "hooks/useFormUtils";
import RoundLoader from "components/RoundLoader";
import Endpoints from "Endpoints";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FloatingActionButton from "components/FloatingActionButton"
import { useFormik } from "formik";
import ProfileBox from './ProfileBox'
import UploadProfileImageBox from './UploadProfileImageBox'
import UtilitiesBox from './UtilitiesBox'
import "./style.scss";
import * as Yup from "yup";
function UserForm(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, setLoading, data, fetch } = useFetch();
    const { fetch: fetchNew } = useFetch();

    const [imageFileForForm, setImageFileForForm] = useState()
    const { isNew } = useFormUtils();
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: isNew() && Yup.string().required(),
    });


    const loadData = async () => {
        try {
            await fetch({
                url: Endpoints.user.getById,
                urlParams: {
                    id: props.match.params.id
                },
                method: "GET",
            })

            //formikUser.initialValues(result)
        }
        catch (e) {

        }
    }


    useEffect(() => {
        if (!isNew()) loadData()
        else {
            themeContext.setTitle("users.newUser", <PersonOutlineOutlinedIcon />);
            setLoading(false)
        }

    }, []);


    const formikUser = useFormik({
        initialValues: isNew() ? {
            role: "BASE",
            status: "ACTIVE",
            password: "passToChange",
            sendActivationEmail: false,
        } : data,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (isNew()) {
                    await fetchNew({
                        url: Endpoints.user.create,
                        data: values,
                        filename: "profileImageUrl",
                        file: imageFileForForm,
                        method: "POST",
                    })
                } else {
                    await fetch({
                        url: Endpoints.user.editByAdmin,
                        data: values,
                        filename: "profileImageUrl",
                        file: imageFileForForm,
                        method: "PUT",
                    })
                }
                themeContext.showSuccessSnackbar({ message: `users.${isNew() ? "created" : "updated"}Successfully` })
            }
            catch (e) {

            }
        }
    });



    if (loading) return <RoundLoader />
    return (
        <form onSubmit={formikUser.handleSubmit}>
            <div id="userForm" className="flex">
                <div className="leftBox flex flex-col w-3/6">
                    <ProfileBox
                        formikUser={formikUser}
                    />
                </div>
                <div className="rightBox flex flex-col w-3/6">
                    <UploadProfileImageBox
                        formikUser={formikUser}
                        setImageFileForForm={setImageFileForForm}
                    />
                    {isNew() && <UtilitiesBox
                        formikUser={formikUser}
                    />}
                </div>
            </div>
            <FloatingActionButton
                type="submit"
                tooltip={isNew() ? "users.createUser" : "users.updateUser"}
                icon={<SaveOutlinedIcon />}
            />
        </form>
    );
}

export default UserForm;
