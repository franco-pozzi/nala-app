import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import moment from "moment";
import Gant from "components/Gant";
import Modal from "components/Modal";
import CollaboratorItem from "components/Gant/components/CollaboratorItem";
import { STATES } from "common/constants/timeOff";
import DinamicModals from "views/TimeOff/components/DinamicModals";
import ManageRequest from "./components/ManageRequests";
import { formatItems } from "./functions";
import { StyledPaper } from "./styles";

const GantTimeOff = (props) => {
  const { data, isLoading, statesFilter = [] } = props;
  const { t } = useTranslation(["timeOff"]);

  const hasPending = (array) => {
    if (
      array.length > 0
      && array.find((element) => element.state === STATES.pending)
    ) return true;
    return false;
  };

  const formatedGroups = data?.map((element) => ({
    id: element.id,
    title: (
      <CollaboratorItem
        fullName={ element.full_name }
        image={ element.profile_img_url }
        jobPosition={ element.position_name }
        isVisibleBadge={ hasPending(element.time_offs) }
      />
    ),
    height: 70,
    stackItems: false,
  }));

  const formatedItems = formatItems(data, statesFilter, t);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(false);

  const [formId, setFormId] = useState();

  const [modalChild, setModalChild] = useState();
  const [cardId, setCardId] = useState(null);

  const onItemSelect = (itemId) => {
    setCardId(itemId);
  };

  const handleModal = (state) => {
    setModalChild(state);
    setIsOpen(true);
  };

  const itemRenderer = ({ item, itemContext, getItemProps }) => (
    <div
      { ...getItemProps(item.itemProps) }
      onMouseEnter={ () => {
        setCardId(item.id);
        setFormId(item.id);
      } }
      onMouseLeave={ () => {
        setCardId(null);
      } }
    >
      {cardId === item.id && (
        <ManageRequest
          id={ item.id }
          handleModal={ handleModal }
          files={ item.files }
          fromMonth={ moment(item.start_time).format("MMM") }
          toMonth={ moment(item.end_time).format("MMM") }
          fromDay={ moment(item.start_time).format("D") }
          toDay={ moment(item.end_time).format("D") }
          type={ item.type }
          state={ item.state }
          rejectionReason={ item.rejection_reason }
        />
      )}

      <div
        style={ {
          height: itemContext.dimensions.height,
          overflow: "hidden",
          paddingLeft: 3,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        } }
      >
        {cardId !== item.id && itemContext.title}
      </div>
    </div>
  );

  return (
    <StyledPaper data-testid={ "gant-time-off-view-component" }>
      <Gant
        onItemSelect={ onItemSelect }
        itemRenderer={ itemRenderer }
        groups={ formatedGroups || [] }
        isLoading={ isLoading }
        items={ formatedItems || [] }
      />
      <Modal isOpen={ isOpen } onClose={ () => handleOpen() }>
        <DinamicModals
          onClose={ handleOpen }
          state={ modalChild }
          itemId={ formId }
        />
      </Modal>
    </StyledPaper>
  );
};

GantTimeOff.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default GantTimeOff;
