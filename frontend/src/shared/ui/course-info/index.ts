import { commonComponentProps } from '../../lib';

class CourseInfo extends HTMLElement {
  private readonly shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { getCN } = commonComponentProps;
    const baseClass = 'course-info';

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod);
    };

    this.shadow.innerHTML = `
      <style>
        p {
          margin: 0;
        }
        .course-info {
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
          color: #0B1014;
          display: grid;
          gap: 5px;
        }
        .course-info span {
          font-size: 22px;
          line-height: 32px;
          color: #1C6CD5;
          margin-left: 8px;
        }
      </style>
      <div class="${getClassName()}">
          <p class="${getClassName('registration')}">
            Регистрация на курс:<span>18.08.2023 &mdash; 24.09.2023</span>
          </p>
          <p class="${getClassName('start')}">
            Начало курса:<span>26.09.2023</span>
          </p>
      </div>
    `;
  }
}

export { CourseInfo };
