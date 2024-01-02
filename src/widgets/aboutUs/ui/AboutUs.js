import { commonComponentProps } from "../../../shared/lib/index.js";

export const AboutUs = () => {
  const {
    getCN,
    extraClasses = {}
  } = commonComponentProps;

  const baseClass = "about-us";

  const getClassName = (elem = "", mod = {}) => {
    return getCN(baseClass, elem, mod);
  }

  return `
    <section class="${getClassName()}">
        <div class="${getClassName("container")} ${extraClasses.container}">
            <article class="${getClassName("content")}">
                <h2 class="${getClassName("title")}">
                    О нас
                </h2>
                <div class="${getClassName("info")}">
                    <h3 class="${getClassName("subtitle")}">
                        > 100 сотрудников
                    </h3>
                    <p class="${getClassName("description")}">
                        Аттестованных middle и senior разработчиков со всеми необходимыми компетенциями для создания качественных продуктов,
                        которые занимают призовые места на всероссийских и международных конкурсах.
                    </p>
                </div>
                <div class="${getClassName("info")}">
                    <h3 class="${getClassName("subtitle")}">
                        Своя диджитал академия
                    </h3>
                    <p class="${getClassName("description")}">
                        Курсы по основам управления проектами, веб-разработки, программированию.
                        Много практики, основанной на проектах нашей компании, познавательные лекции и море интерактива.
                    </p>
                </div>
            </article>
            <article class="${getClassName("tutorial")}">
                <h2 class="${getClassName("title")}">
                    Как пройти курс
                </h2>
                <div class="${getClassName("repost")}">
                    <div class="${getClassName("repost-content")}">
                        <p class="${getClassName("repost-description")}">
                            Записывайтесь и получайте новые знания! 
                            Делайте репост и отправляйте друзьям, которым эта новость будет полезна.
                        </p>
                        <h3 class="${getClassName("repost-subtitle")}">
                            Ждем вас на наших курсах!
                        </h3>
                    </div>
                    <div class="${getClassName("repost-qr")}">
                        <img src="/images/qr.svg" alt="about us qr-code">
                    </div>
                </div>
            </article>
        </div>
    </section>
  `;
}