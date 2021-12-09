import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function InterviewerListItem(props) {

	const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});
	const avatarClass = classNames("interviewers__item-image", {"interviewers__item--selected-image": props.selected});

	return (
		<li className={interviewerClass}>
			<img
				className={avatarClass}
				src={props.avatar}
				onClick={props.onChange}
				alt={props.name}
			/>
			{props.selected && props.name}
		</li>
	);
};

InterviewerListItem.propTypes = {
	avatar: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	selected: PropTypes.bool,
};