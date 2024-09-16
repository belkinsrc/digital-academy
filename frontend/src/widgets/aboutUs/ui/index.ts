import { commonComponentProps } from '@/shared/lib';

class AboutUs extends HTMLElement {
  private readonly shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const { getCN, extraClasses } = commonComponentProps;
    const baseClass = 'about-us';

    const getClassName = (elem = '', mod = {}) => {
      return getCN(baseClass, elem, mod);
    };

    this.shadow.innerHTML = `
      <style>
        h2, h3 {
          margin: 0;
        }
        .about-us__title {
          font-size: 40px;
          line-height: 48px;
          color: #0B1014;
          margin-bottom: 40px;
        }
        .about-us__container {
          display: flex;
          justify-content: space-between;
          gap: 152px;
        }
        .about-us__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .about-us__subtitle {
          font-size: 28px;
          line-height: 40px;
          color: #1C6CD5;
          margin-bottom: 16px;
        }
        .about-us__description {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #222222;
        }
        .about-us__info {
          max-width: 725px;
          margin-bottom: 36px;
        }
        .about-us__info:last-child {
          margin-bottom: 0;
        }
        .about-us__repost {
          display: flex;
          justify-content: flex-start;
          padding: 40px 40px 56px 40px;
          background-color: rgba(255, 255, 255, 1);
          border-radius: 12px;
          gap: 32px;
        }
        .about-us__repost-content {
          max-width: 565px;
        }
        .about-us__repost-description {
          font-size: 20px;
          line-height: 28px;
          color: #222222;
          margin-bottom: 16px;
        }
        .about-us__repost-subtitle {
          font-size: 28px;
          line-height: 36px;
          color: #1C6CD5;
        }
      </style>
      <section class="${getClassName()}">
        <div class="${getClassName('container')} ${extraClasses.container}">
            <article class="${getClassName('content')}">
                <h2 class="${getClassName('title')}">
                    О нас
                </h2>
                <div class="${getClassName('info')}">
                    <h3 class="${getClassName('subtitle')}">
                        > 100 сотрудников
                    </h3>
                    <p class="${getClassName('description')}">
                        Аттестованных middle и senior разработчиков со всеми необходимыми компетенциями для создания качественных продуктов,
                        которые занимают призовые места на всероссийских и международных конкурсах.
                    </p>
                </div>
                <div class="${getClassName('info')}">
                    <h3 class="${getClassName('subtitle')}">
                        Своя диджитал академия
                    </h3>
                    <p class="${getClassName('description')}">
                        Курсы по основам управления проектами, веб-разработки, программированию.
                        Много практики, основанной на проектах нашей компании, познавательные лекции и море интерактива.
                    </p>
                </div>
            </article>
            <article class="${getClassName('tutorial')}">
                <h2 class="${getClassName('title')}">
                    Как пройти курс
                </h2>
                <div class="${getClassName('repost')}">
                    <div class="${getClassName('repost-content')}">
                        <p class="${getClassName('repost-description')}">
                            Записывайтесь и получайте новые знания! 
                            Делайте репост и отправляйте друзьям, которым эта новость будет полезна.
                        </p>
                        <h3 class="${getClassName('repost-subtitle')}">
                            Ждем вас на наших курсах!
                        </h3>
                    </div>
                    <div class="${getClassName('repost-qr')}">
                        <img src="/images/qr.svg" alt="about us qr-code">
                    </div>
                </div>
            </article>
        </div>
    </section>
    `;
  }
}

export { AboutUs };
