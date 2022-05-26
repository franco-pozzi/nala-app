import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEqual, isUndefined } from "common/helpers";
import { getOne as getCollaboratorBenefits } from "redux/actions/benefitsActions";

export const useUserBenefits = (collaboratorId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    list: benefitsList,
    isLoadingList: isLoadingBenefits,
    one: collaboratorBenefits,
    isLoadingOne: isLoadingCollaboratorBenefits,
    errorOne,
  } = useSelector(({ benefitsReducer }) => benefitsReducer);

  const dispatch = useDispatch();

  const getBenefitsName = useCallback(
    (benefits) => benefits?.map((item) => {
      item.name = benefitsList?.filter((element) => isEqual(element.id, item.payroll_item_id))
        .map((element) => element.name);
      return item;
    }),
    [benefitsList],
  );

  useEffect(() => {
    if (!isLoadingBenefits && collaboratorId && !isUndefined(collaboratorId)) {
      dispatch(getCollaboratorBenefits(collaboratorId));
    }
  }, [dispatch, benefitsList, isLoadingBenefits, collaboratorId]);

  useEffect(() => {
    if (!isLoadingCollaboratorBenefits) {
      setData(getBenefitsName(collaboratorBenefits));
      setIsLoading(false);
    }
  }, [isLoadingCollaboratorBenefits, collaboratorBenefits, getBenefitsName]);

  return [data, isLoading, errorOne];
};
