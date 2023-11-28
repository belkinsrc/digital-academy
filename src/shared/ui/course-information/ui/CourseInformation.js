import { commonComponentProps } from "../../../lib/index.js";

export const CourseInformation = (baseClass) => {
    const getClassName = (elem = "", mod = {}) => {
        return commonComponentProps.getCN(baseClass, elem, mod);
    }

    return `
        <div class="${getClassName("course-info")}">
            <p class="${getClassName("course-registration")}">
                Регистрация на курс:<span>18.08.2023 &mdash; 24.09.2023</span>
            </p>
            <p class="${getClassName("course-start")}">
                Начало курса:<span>26.09.2023</span>
            </p>
        </div>
    `;
}