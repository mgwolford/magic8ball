(() => {
    // Add hidden class style with higher specificity
    const style = document.createElement("style");
    style.innerHTML = ".screen.hidden { display: none !important; }";
    document.head.appendChild(style);

    function initRandomizer() {
      const formRow = document.querySelector(".screen-intro");
      if (!formRow) {
        return;
      }

      const form = formRow.querySelector("form.to-form__containter");
      if (!form) {
        return;
      }

      const resultRows = Array.from(document.querySelectorAll(".screen-result"));
      if (resultRows.length === 0) {
        return;
      }

      const finalPage = document.querySelector(".screen-footer");

      // Hide all result screens initially
      resultRows.forEach((result) => {
        result.classList.add("hidden");
      });

      if (finalPage) {
        finalPage.classList.add("hidden");
      }

      // Ensure button doesn't shake on initial page load
      const buttonImage = document.getElementById("randomizer-button-image");
      if (buttonImage) {
        buttonImage.classList.remove("shaking", "fade-in");
      }

      function resetToInitialState() {
        formRow.classList.remove("hidden");
        resultRows.forEach((result) => {
          result.classList.add("hidden");
        });
        if (finalPage) {
          finalPage.classList.add("hidden");
        }
        if (form) {
          form.reset();
        }
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        if (buttonImage) {
          buttonImage.classList.remove("fade-in", "shaking");
        }
      }

      // Reset button
      const resetBtn = document.getElementById("btn-ask-another");
      if (resetBtn) {
        resetBtn.addEventListener("click", resetToInitialState);
      }

      // Handle button click/touch - vibrate immediately on user gesture
      const submitButton = document.getElementById("randomizer-button");
      if (submitButton) {
        const triggerVibration = () => {
          if (navigator.vibrate) {
            try {
              navigator.vibrate([100, 50, 100]);
            } catch (e) {
              console.debug("Vibration not available:", e);
            }
          }
        };

        submitButton.addEventListener(
          "touchstart",
          (e) => {
            triggerVibration();
          },
          { passive: true }
        );

        submitButton.addEventListener("click", (e) => {
          triggerVibration();
        });
      }

      function handleFormSubmission() {
        const buttonImage = document.getElementById("randomizer-button-image");

        if (buttonImage) {
          buttonImage.classList.add("shaking");

          setTimeout(() => {
            buttonImage.classList.remove("shaking");
            formRow.classList.add("hidden");
            resultRows.forEach((result) => {
              result.classList.add("hidden");
            });

            const randomIndex = Math.floor(Math.random() * resultRows.length);
            const randomRow = resultRows[randomIndex];

            if (randomRow) {
              randomRow.style.opacity = "0";
              randomRow.classList.remove("hidden");

              if (finalPage) {
                finalPage.style.opacity = "0";
                finalPage.classList.remove("hidden");
              }

              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });

              requestAnimationFrame(() => {
                randomRow.style.transition = "opacity 0.9s ease-in-out";
                randomRow.style.opacity = "1";
                if (finalPage) {
                  finalPage.style.transition = "opacity 0.9s ease-in-out";
                  finalPage.style.opacity = "1";
                }
              });
            }
          }, 2000);
        } else {
          formRow.classList.add("hidden");
          resultRows.forEach((result) => {
            result.classList.add("hidden");
          });
          const randomIndex = Math.floor(Math.random() * resultRows.length);
          const randomRow = resultRows[randomIndex];
          if (randomRow) {
            randomRow.style.opacity = "0";
            randomRow.classList.remove("hidden");
            if (finalPage) {
              finalPage.style.opacity = "0";
              finalPage.classList.remove("hidden");
            }
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
            requestAnimationFrame(() => {
              randomRow.style.transition = "opacity 0.9s ease-in-out";
              randomRow.style.opacity = "1";
              if (finalPage) {
                finalPage.style.transition = "opacity 0.9s ease-in-out";
                finalPage.style.opacity = "1";
              }
            });
          }
        }
      }

      form.addEventListener("formsubmission", (e) => {
        handleFormSubmission();
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formSubmissionEvent = new CustomEvent("formsubmission", {
          bubbles: true,
          cancelable: true,
        });
        form.dispatchEvent(formSubmissionEvent);
      });
    }

    const input = document.querySelector("input");
    if (input) {
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          input.blur();
        }
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        initRandomizer();
      });
    } else {
      initRandomizer();
    }
  })();
