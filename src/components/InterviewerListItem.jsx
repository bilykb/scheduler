import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
	let interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})
	let avatarClass = classNames("interviewers__item-image", {"interviewers__item--selected-image": props.selected})

	return (
		<li className={interviewerClass}>
			<img
				className={avatarClass}
				src={props.avatar}
				onClick={props.setInterviewer(props.id)}
				alt={props.name}
			/>
			{props.children}
		</li>
	);
}