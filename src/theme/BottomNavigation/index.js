import React, { useContext } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import _ from "lodash";
import BottombarMenu from "configuration/BottombarMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import config from "configuration/config";
import { matchPath } from "react-router";
import { makeStyles } from "@mui/styles";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  bottomNavigation: (props) => ({
    width: props.matches
      ? "100%"
      : `calc(100% -
            ${props.sidebarOpen
        ? config.theme.sidebar.drawerWidth
        : theme.spacing(9) + 1
      }px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3,
    }),
    bottomNavigationShift: {
      marginLeft: config.theme.sidebar.drawerWidth,
      //width: `calc(100% - ${config.theme.sidebar.drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen * 3,
      }),
    },
    position: "fixed",
    bottom: 0,
  }),
  bottomNavigationActive: {
    color: `${config.theme.bottomNavigation.activeColor} !important`,
  },
}));
function BottomNavigationCustomized(props) {
  const history = useHistory();
  const themeContext = useContext(ThemeContext);
  const matches = useMediaQuery("(max-width:" + config.mobileScreenWidth + ")");
  const classes = useStyles({ matches, sidebarOpen: themeContext.sidebarOpen });
  const { t } = useTranslation();
  if (!config.theme.bottomNavigation.showOnDesktop && !matches) return null;

  const goTo = (url) => (event) => history.push(url);

  const getValueByRoot = () => {
    let j = 0;
    for (let i = 0; i < BottombarMenu.length; i++) {
      let single = BottombarMenu[i];
      //if(!props.belongsToProfiles(single.types)) continue;

      const isActive = matchPath(history.location.pathname, {
        path: single.to,
        exact: true,
      });

      if (isActive) return j;
      j++;
    }
  };

  return (
    <BottomNavigation
      showLabels={config.theme.bottomNavigation.showLabels}
      className={classnames("bottom-navigation", classes.bottomNavigation, {
        [classes.bottomNavigationShift]: themeContext.sidebarOpen,
      })}
      value={getValueByRoot()}
    >
      {_.map(BottombarMenu, (item, index) => {
        //if(!props.belongsToProfiles(item.types)) return null;

        return (
          <BottomNavigationAction
            key={index}
            label={t(item.id)}
            icon={item.icon}
            onClick={goTo(item.to)}
            classes={{ selected: classes.bottomNavigationActive }}
          />
        );
      })}
    </BottomNavigation>
  );
}

export default BottomNavigationCustomized;