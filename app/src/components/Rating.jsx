import StarRating from "react-rating-stars-component";
import { formatNumber } from "../helpers/formatters";

// eslint-disable-next-line react/prop-types
export const Rating = ({ voteAverage, voteCount }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {/* <p className="m-0 align-middle">{voteAverage / 2}</p> */}

      <StarRating
        count={5}
        value={voteAverage / 2}
        size={18}
        activeColor="#ffffff"
        isHalf={true}
        edit={false}
      />

      <p className="m-0 align-middle">
        <small>({formatNumber(voteCount)})</small>
      </p>
    </div>
  );
};
