import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import SkeletonLoader from "components/SkeletonLoader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { SKELETONS_NUMBER } from "common/constants";

const TabPanel = (props) => {
  const { children, value, index, isLoading } = props;

  return (
    <div
      data-testid="tabPanelContainer"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box>
          {isLoading ? (
            <>
              <Card data-testid="account-profile-tab">
                <Divider />
                <CardContent>
                  <SkeletonLoader numberOfSkeletons={SKELETONS_NUMBER.NINE} />
                </CardContent>
              </Card>{" "}
            </>
          ) : (
            children
          )}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
  isLoading: PropTypes.bool,
};

export default TabPanel;
