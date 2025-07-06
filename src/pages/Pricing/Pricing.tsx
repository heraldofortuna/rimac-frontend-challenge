import BackArrowBlueIcon from "@assets/back-arrow-blue.svg";
import BackArrowGrayIcon from "@assets/back-arrow-gray.svg";
import NextArrowBlueIcon from "@assets/next-arrow-blue.svg";
import NextArrowGrayIcon from "@assets/next-arrow-gray.svg";
import PersonalOptionIcon from "@assets/personal-option.svg";
import OtherPersonOptionIcon from "@assets/other-person-option.svg";
import { usePlans } from "../../hooks/usePlans";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Selector from "../../components/Selector";
import Loader from "../../components/Loader/Loader";
import type { Plan, Plans } from "../../types/api/plans";
import type { NavigationState } from "../../types/custom/navigation";
import type { User } from "../../types/api/user";
import styles from "./Pricing.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plans, loading: isLoadingPlans } = usePlans();
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPlans, setSelectedPlans] = useState<Plans | null>(null);
  const [isForSomeone, setIsForSomeone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const swiperRef = useRef(null);

  const options = [
    {
      id: "for-me",
      title: "Para mí",
      description:
        "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
      icon: PersonalOptionIcon,
    },
    {
      id: "for-someone",
      title: "Para alguien más",
      description:
        "Realiza una cotización para uno de tus familiares o cualquier persona.",
      icon: OtherPersonOptionIcon,
    },
  ];

  const handlePlanClick = (plan: Plan) => {
    if (!userData) return;

    const summaryData = {
      ...userData,
      plan: {
        ...plan,
        isForSomeone: isForSomeone,
      },
    };

    navigate("/summary", {
      state: {
        summaryData,
        timestamp: new Date().toISOString(),
      } satisfies NavigationState,
    });
  };

  useEffect(() => {
    const state = location.state as NavigationState | undefined;

    if (!state?.userData) {
      navigate("/");
      return;
    }

    setUserData(state.userData);
    setIsLoading(false);
  }, [location.state, navigate]);

  useEffect(() => {
    const loadPlans = async () => {
      if (plans && userData) {
        const selectedPlans = plans.filter(
          (plan: Plan) => userData.age < plan.age,
        );
        setSelectedPlans(selectedPlans);
        
        setTimeout(() => {
          document.getElementById('plansContainer')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    };

    if (selectedOption) {
      setIsForSomeone(selectedOption === "for-someone");
      loadPlans();
    }
  }, [selectedOption, userData]);

  if (isLoading || isLoadingPlans) {
    return <Loader />;
  }

  if (!userData || !plans) {
    navigate("/404");
    return;
  }

  return (
    <>
      <div className={styles.stepper}>
        <div className={styles["stepper--mobile"]}>
          <a href="/" className={styles["stepper--mobile__icon"]}>
            <img src={BackArrowGrayIcon} alt="Volver" />
          </a>
          <p className={styles["stepper--mobile__text"]}>Paso 1 de 2</p>
          <div className={styles["stepper--mobile__bar"]}>
            <span className={styles["stepper--mobile__bar--fill"]}></span>
          </div>
        </div>

        <div className={styles["stepper--desktop"]}>
          <div
            className={`${styles["stepper--desktop__step"]} ${styles["stepper--desktop__step--first"]}`}
          >
            <span
              className={`${styles["stepper--desktop__step__number"]} ${styles["stepper--desktop__step__number--first"]}`}
            >
              1
            </span>
            <p>Planes y coberturas</p>
          </div>
          <span className={styles["stepper--desktop__line"]}></span>
          <div
            className={`${styles["stepper--desktop__step"]} ${styles["stepper--desktop__step--second"]}`}
          >
            <span
              className={`${styles["stepper--desktop__step__number"]} ${styles["stepper--desktop__step__number--second"]}`}
            >
              2
            </span>
            <p>Resumen</p>
          </div>
        </div>
      </div>

      <div className={styles.pricing}>
        <div className={styles.container}>
          <a href="/" className={styles.backButton}>
            <img src={BackArrowBlueIcon} alt="Volver" />
            <p className={styles.backButton__text}>Volver</p>
          </a>

          <div className={styles.content}>
            <div className={styles.text}>
              <h1 className={styles.text__title}>
                {userData.name} ¿Para quién deseas cotizar?
              </h1>
              <p className={styles.text__description}>
                Selecciona la opción que se ajuste más a tus necesidades.
              </p>
            </div>

            <Selector
              options={options}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
          </div>

          {selectedPlans && (
            <div id="plansContainer" className={styles.plansContainer}>
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                 onSlideChange={(swiper) => {
                  setCurrentSlide(swiper.realIndex + 1);
                  setTotalSlides(swiper.slides.length);
                }}
                onInit={(swiper) => {
                  setCurrentSlide(1);
                  setTotalSlides(swiper.slides.length);
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  el: '.custom-pagination',
                  type: 'custom',
                  renderCustom: (_, current, total) => {
                    return `<div class="${styles.paginationContainer}">
                      <span class="${styles.paginationArrow}">&lt;</span>
                      <span class="${styles.paginationNumbers}">${current}/${total}</span>
                      <span class="${styles.paginationArrow}">&gt;</span>
                    </div>`;
                  }
                }}
                breakpoints={{
                  320: { 
                    slidesPerView: 1.1,
                    spaceBetween: 16,
                    navigation: false
                  },
                  768: { 
                    slidesPerView: 2.1,
                    spaceBetween: 20,
                    navigation: false
                  },
                  1024: { 
                    slidesPerView: 3,
                    spaceBetween: 24,
                    navigation: true
                  }
                }}
                className={styles.plansSlider}
              >
                {selectedPlans.map((plan) => (
                  <SwiperSlide key={plan.id} className={styles.planSlide}>
                    <Card>
                      <div className={styles.plan}>
                        <div className={styles.plan__header}>
                          <div className={styles.plan__header__title}>
                            <h3 className={styles.plan__header__title__text}>
                              {plan.name}
                            </h3>
                            <img src={plan.icon} alt={plan.name} />
                          </div>
                          <div className={styles.plan__header__cost}>
                            <p className={styles.plan__header__cost__label}>
                              Costo del plan
                            </p>
                            {isForSomeone && (
                              <p className={styles.plan__header__cost__past}>
                                ${plan.price} antes
                              </p>
                            )}
                            <p className={styles.plan__header__cost__value}>
                              ${isForSomeone ? plan.discountPrice : plan.price} al mes
                            </p>
                          </div>
                        </div>
                        <span className={styles.plan__separator}></span>
                        <ul className={styles.plan__list}>
                          {plan.description.map((item) => (
                            <li key={item} className={styles.plan__list__element}>
                              <p>{item}</p>
                            </li>
                          ))}
                        </ul>
                        <div className={styles.plan__button}>
                          <Button
                            text="Seleccionar Plan"
                            color="red"
                            onClick={() => handlePlanClick(plan)}
                          />
                        </div>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}

                <div className={styles.customPagination}>
                  <span 
                    className={styles.paginationArrow}
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                  >
                    <img
                      src={currentSlide === 1 ? BackArrowGrayIcon : BackArrowBlueIcon}
                      width={32}
                      height={32}
                      alt="Vamos al plan anterior"
                    />
                  </span>
                  <span className={styles.paginationNumbers}>
                    {currentSlide} / {totalSlides}
                  </span>
                  <span 
                    className={styles.paginationArrow}
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                  >
                    <img
                      src={currentSlide === totalSlides ? NextArrowGrayIcon : NextArrowBlueIcon}
                      width={32}
                      height={32}
                      alt="Vamos al siguiente plan"
                    />
                  </span>
                </div>
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pricing;
