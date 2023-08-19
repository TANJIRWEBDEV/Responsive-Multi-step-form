import "./App.css";
import "./formsteps.css";
import Mobile from "./assets/bg-mobile.svg";
import Desktop from "./assets/bg-desktop.svg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { plansD, addsD, stepData } from "./constants";
import ThanksI from "./assets/thank-you.svg";
import { useWindowSize } from "@uidotdev/usehooks";
function App() {
  const size = useWindowSize();
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onBlur",
  });
  const [step, setStep] = useState(1);

  const [plan, setPlan] = useState({
    name: "Arcade",
    price: 9,
    duration: "mo",
    con: true,
  });
  const [adds, setAdds] = useState([]);

  const handleS = () => {
    if (step < 5) setStep((p) => p + 1);
  };
  const sBack = () => {
    if (step > 1) setStep((p) => p - 1);
  };
  const addsF = (v) => {
    const inc = adds.some((ad) => ad?.name === v.name);
    if (inc) {
      const filterAdds = adds.filter((add) => add.name !== v.name);
      setAdds(filterAdds);
    } else {
      setAdds((p) => [
        ...p,
        { name: v.name, price: v.price, duration: v.duration },
      ]);
    }
  };
  useEffect(() => {
    plansD.map((v) => {
      if (v.name === plan.name) {
        setPlan((p) => {
          return {
            ...p,
            price: v.price[plan.con ? 0 : 1],
            duration: v.duration[plan.con ? 0 : 1],
          };
        });
      }
    });
  }, [plan.con, plan.name]);

  return (
    <main className="main">
      <div className="main__container">
        <div className="main__container__items__1">
          <div className="mc__items_1-1">
            <img src={size.width < 850 ? Mobile : Desktop} alt="" />
          </div>
          <div className="mc__items_1-2">
            {stepData.map((v, i) => {
              return (
                <div key={i}>
                  <p
                    className={
                      i + 1 === step || (i + 2 > 4 && step === 5)
                        ? "active"
                        : ""
                    }
                  >
                    {v.id}
                  </p>
                  {size.width > 850 && (
                    <div className="mc__items_1-2_1_2">
                      <div>{v.name}</div>
                      <h5>{v.info}</h5>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleS)} className="form__items">
          {/* form step 1 */}
          <section className={step === 1 ? "formsteps activeF" : "formsteps"}>
            <h1>Personal info</h1>
            <p>Please provide your name, email address, and phone number.</p>
            <div className="formstep1__items_3">
              <div className="formstep1__items_3-1">
                <div>
                  <label htmlFor="name">Name </label>
                  <p>{errors?.name?.message}</p>
                </div>
                <input
                  type="text"
                  id="name"
                  className={errors?.name?.message ? "ierror" : ""}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name field required",
                    },
                    minLength: {
                      value: 3,
                      message: "Name should be bigger than 2 words",
                    },
                    maxLength: {
                      value: 15,
                      message: "Name should be less than 15 words",
                    },
                  })}
                  placeholder="e.g. Stephen King"
                />
              </div>
              <div className="formstep1__items_3-1">
                <div>
                  <label htmlFor="name">Email Address </label>
                  <p>{errors?.email?.message}</p>
                </div>
                <input
                  type="text"
                  id="email"
                  className={errors?.email?.message ? "ierror" : ""}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email field required",
                    },
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Valid email required",
                    },
                    maxLength: {
                      value: 35,
                      message: "Name should be less than 15 words",
                    },
                  })}
                  placeholder="e.g. stephenking@lorem.com"
                />
              </div>
              <div className="formstep1__items_3-1">
                <div>
                  <label htmlFor="name">PhoneNumber</label>
                  <p>{errors?.phone?.message}</p>
                </div>
                <input
                  type="text"
                  id="phone"
                  className={errors?.phone?.message ? "ierror" : ""}
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone field required",
                    },
                    pattern: {
                      value: /^\+\d{1,3} \d{3} \d{3} \d{3}$/,
                      message: "Valid number required",
                    },
                  })}
                  placeholder="e.g. +1 234 567 890"
                />
              </div>
            </div>
          </section>
          {/* form step 2 */}
          <section className={step === 2 ? "formsteps activeF" : "formsteps"}>
            <h1>Select your plan</h1>
            <p>You have the option of monthly or yearly billing.</p>
            <div className="formstep2__items_3">
              {plansD.map((v) => {
                return (
                  <div
                    className={
                      plan.name === v.name
                        ? "formstep2__items_3_1 seActice"
                        : "formstep2__items_3_1"
                    }
                    key={v.id}
                    onClick={() => setPlan((p) => ({ ...p, name: v.name }))}
                  >
                    <span>
                      <img src={v.img} alt="" />
                    </span>
                    <div>
                      <h3>{v.name}</h3>
                      <p>
                        ${v.price[plan.con ? 0 : 1]}/
                        {v.duration[plan.con ? 0 : 1]}
                      </p>
                      <h6>{plan.con ? "" : "2 months free"}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="formstep2__items_4">
              <p
                className={`formstep2__items_4-1  ${plan.con ? "" : "mActive"}`}
              >
                Monthly
              </p>
              <div
                onClick={() => setPlan((p) => ({ ...p, con: !p.con }))}
                className={`formstep2__items_4-2 ${plan.con ? "" : "myS"}`}
              ></div>
              <p
                className={`formstep2__items_4-1  ${
                  !plan.con ? "" : "mActive"
                }`}
              >
                {" "}
                Yearly
              </p>
            </div>
          </section>
          {/* form step 3 */}
          <section className={step === 3 ? "formsteps activeF" : "formsteps"}>
            <h1>Pick add-ons</h1>
            <p>Add-ons help enhance your gaming experience.</p>
            <div className="formstep3__items_3">
              {addsD.map((v, i) => {
                const inc = adds.some((ad) => ad?.name === v.name);
                return (
                  <div
                    key={i}
                    className={`formstep3__items_3_1 ${inc ? "seActices" : ""}`}
                    onClick={() => addsF(v)}
                  >
                    <input type="checkbox" checked={inc} />
                    <div>
                      <h4>{v.name}</h4>
                      <p>{v.info}</p>
                    </div>
                    <p>
                      +${v.price[plan.con ? 0 : 1]}/
                      {v.duration[plan.con ? 0 : 1]}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          {/* form step 4 */}
          <section className={step === 4 ? "formsteps activeF" : "formsteps"}>
            <h1>Finishing up</h1>
            <p>Double-check everything looks ok before confirming</p>
            <div className="formstep4__items_3">
              <div className="formstep4__items_3_1">
                <div>
                  <h4>
                    {plan.name}&nbsp;({plan.con ? "Monthly" : "Yearly"})
                  </h4>
                  <p onClick={() => setStep(2)}>Change</p>
                </div>{" "}
                <p>
                  ${plan.price}/{plan.duration}
                </p>
              </div>
              <hr />
              {adds.map((v, i) => {
                return (
                  <div className="formstep4__items_3_2" key={i}>
                    <p>{v.name}</p>
                    <p>
                      +${v.price[plan.con ? 0 : 1]}/
                      {v.duration[plan.con ? 0 : 1]}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="formstep4__items_4">
              <p>Total (per {plan.con ? "month" : "year"})</p>
              <p>
                +$
                {adds.length > 0
                  ? adds.reduce((p, c) => {
                      return p + c.price[plan.con ? 0 : 1];
                    }, 0) + plan.price
                  : plan.price}
                /{plan.duration}
              </p>
            </div>
          </section>
          {/* finish step*/}
          <section className={step === 5 ? "formsteps activeF" : "formsteps"}>
            <div className="formstep5__container">
              <div>
                <img src={ThanksI} alt="" />
              </div>
              <h1>Thank you!</h1>
              <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
              </p>
            </div>
          </section>
          <div
            className="section__items_4"
            style={{
              justifyContent: step > 1 ? "space-between" : "flex-end",
              display: step > 4 ? "none" : "flex",
            }}
          >
            {step > 1 && <p onClick={sBack}>Go Back</p>}
            <button
              type="submit"
              style={{
                backgroundColor:
                  step === 4 ? "hsl(243, 100%, 62%)" : "hsl(213, 96%, 18%)",
              }}
            >
              {step !== 4 ? "Next Step" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
