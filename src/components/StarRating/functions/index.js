import React from "react";
import { CLASSIFICATION_RANK, CLASSIFICATION_RANK_WITH_DESCRIPTION, RATING } from "common/constants";

export const getRating = (value, maxRating) => (value > RATING.initial
  ? (RATING.stars * value) / maxRating
  : RATING.initial);

const tooltipDescription = (t) => [
  {
    key: CLASSIFICATION_RANK.SUPER_STAR,
    value: (
      <p>{t("classificationRankDescription.superStar.text")}</p>
    ),
  },
  {
    key: CLASSIFICATION_RANK.STAR,
    value: (
      <>
        <p>{t("classificationRankDescription.star.text")}</p>
        <br />
        <p>{t("classificationRankDescription.star.moreInfo")}</p>
      </>
    ),
  },
  {
    key: CLASSIFICATION_RANK.CONSISTENT,
    value: (
      <p>{t("classificationRankDescription.consistent.text")}</p>
    ),
  },
  {
    key: CLASSIFICATION_RANK.IN_DEVELOPMENT,
    value: (
      <p>{t("classificationRankDescription.inDevelopment.text")}</p>
    ),
  },
  {
    key: CLASSIFICATION_RANK.NOT_CONSISTENT,
    value: (
      <p>{t("classificationRankDescription.notConsistent.text")}</p>
    ),
  },
];

export const getTooltipDescription = (label, t) => tooltipDescription(t).find(
  (item) => item.key === CLASSIFICATION_RANK_WITH_DESCRIPTION[label],
);
