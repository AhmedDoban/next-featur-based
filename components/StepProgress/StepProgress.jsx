import "./StepProgress.css";

function StepProgress({ Title, Steps }) {
  const activeStepIndex = Steps.findIndex((step) => step.isActive);
  const actualActiveIndex =
    activeStepIndex >= 0 ? activeStepIndex : Steps.length - 1;

  const progressPercentage =
    actualActiveIndex >= 0 ? (actualActiveIndex / (Steps.length - 1)) * 100 : 0;

  return (
    <div
      className="StepProgress"
      style={{
        "--progress-width": `${progressPercentage}%`,
        "--progress-height": `${progressPercentage}%`,
      }}
    >
      {Title && <h1>{Title}</h1>}
      <div className="steps">
        {Steps.map((step, index) => {
          const isActive = index === actualActiveIndex;
          const isCompleted = index < actualActiveIndex;

          return (
            <div
              key={index}
              className={`step ${isActive ? "active" : ""} ${
                isCompleted ? "completed" : ""
              }`}
            >
              <div className="step-circle">
                <span className="step-number">
                  {isCompleted ? "✓" : index + 1}
                </span>
              </div>
              <div className="Step-title">{step.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default StepProgress;
