import { TransportLayout } from "./layouts/TransportLayout";
import { useEffect, useState } from "react";
import { StepVariant } from "./constants/StepValriants";
import { TargetCredit } from "./features/TargetCredit";
import { SourceCredit } from "./features/SourceCredit";
import { ReportTransport } from "./features/ReportTransport";

const steps = [TargetCredit, SourceCredit, ReportTransport];

function App() {
  const [stepsForm, setStepsForm] = useState([
    { sourceCredit: "", targetCredit: "", price: "" },
    { cvv2: "", month: "", year: "", dynamicPassword: "", timer: null },
    {},
  ]);
  const [step, setStep] = useState(0);
  
  const onNextStep = () => {
   setStep(prevStep=>prevStep+1)
  };
  
  const onPrevStep = () => {
    setStep(prevStep=>prevStep-1)
  };

  const getStepValue = (step) => {
    return stepsForm[step]
  };


  const handleStepValue = (step, name, value) => {
    setStepsForm(prevState => {
      const newState = [...prevState];
      newState[step][name] = value;
      return newState;
    });
  };
  
  useEffect(() => {
    let timer;
    if (stepsForm[1].timer !== null) {
      timer = setInterval(() => {
        setStepsForm(prevState => {
          const newState = [...prevState];
          if (newState[1].timer > 0) {
            newState[1].timer -= 1;
          } else {
            clearInterval(timer);
          }
          return newState;
        });
      }, 1000);
    }
  
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [stepsForm[1].timer]);


 

  const registerInput = (name) => {
    return {
      value: stepsForm[step][name] || "",
      onChange: (e) => {
        const value = e.target.value;
        setStepsForm((prevStepsForm) => {
          const newStepsForm = [...prevStepsForm];
          newStepsForm[step] = {
            ...newStepsForm[step],
            [name]: value
          };
          return newStepsForm;
        });
      }
    };
  };


  const CurrentStep = steps[step];
  return (
    <TransportLayout>
      <CurrentStep
        registerInput={registerInput}
        handleValue={(name, value) => handleStepValue(step, name, value)}
        getStepValue={getStepValue}
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
      />
    </TransportLayout>
    
  );
}

export default App;
