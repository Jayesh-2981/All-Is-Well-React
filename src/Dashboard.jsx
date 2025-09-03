import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [members, setMembers] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    // Load members from memory (no localStorage in this environment)
    setMaxDateToToday();

    window.selectMember = (id) => {
      if (!members[id]) return;
      setSelectedMember(id);
      const selectedTitle = document.getElementById("selectedMemberTitle");
      if (selectedTitle)
        selectedTitle.textContent = `${members[id].name}'s Health Records`;
      const healthSection = document.getElementById("healthActionsSection");
      if (healthSection) {
        healthSection.style.display = "block";
        healthSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.removeMember = (id) => {
      if (!members[id]) return;
      const memberName = members[id].name;

      // Show confirmation dialog using box modal style
      const confirmTitle = document.querySelector("#menu-option-2 h3");
      const confirmMessage = document.querySelector(
        "#menu-option-2 .boxed-text-xl"
      );
      if (confirmTitle) confirmTitle.textContent = "Remove Member?";
      if (confirmMessage)
        confirmMessage.textContent = `Are you sure you want to remove ${memberName}? This action cannot be undone.`;

      // Set up the confirm button
      const confirmBtn = document.querySelector(
        "#menu-option-2 .color-green-dark"
      );
      const cancelBtn = document.querySelector(
        "#menu-option-2 .color-red-dark"
      );

      if (confirmBtn) {
        confirmBtn.onclick = (e) => {
          e.preventDefault();
          const copy = { ...members };
          delete copy[id];
          setMembers(copy);
          if (selectedMember === id) {
            setSelectedMember(null);
            const healthSection = document.getElementById(
              "healthActionsSection"
            );
            if (healthSection) healthSection.style.display = "none";
          }
          closeMenu("menu-option-2");
          showSuccessNotification(`${memberName} removed successfully!`);
        };
      }

      if (cancelBtn) {
        cancelBtn.onclick = (e) => {
          e.preventDefault();
          closeMenu("menu-option-2");
        };
      }

      openMenu("menu-option-2");
    };

    return () => {
      try {
        delete window.selectMember;
        delete window.removeMember;
      } catch (e) {}
    };
  }, [members, selectedMember]);

  function setMaxDateToToday() {
    const today = new Date().toISOString().split("T")[0];
    ["memberDob", "bpDate", "sugarDate"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute("max", today);
    });
  }

  function setDefaultDateTime() {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().slice(0, 5);
    const bpDate = document.getElementById("bpDate");
    const bpTime = document.getElementById("bpTime");
    const sugarDate = document.getElementById("sugarDate");
    const sugarTime = document.getElementById("sugarTime");
    if (bpDate) bpDate.value = today;
    if (bpTime) bpTime.value = currentTime;
    if (sugarDate) sugarDate.value = today;
    if (sugarTime) sugarTime.value = currentTime;
  }

  function openMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.classList.add("menu-active");
      setTimeout(() => {
        menu.style.display = "block";
      }, 10);
    }
  }

  function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.classList.remove("menu-active");
      setTimeout(() => {
        menu.style.display = "none";
      }, 300);
    }
  }

  function showSuccessNotification(message) {
    const titleEl = document.querySelector(
      "#menu-success-2 .text-center.font-700"
    );
    const messageEl = document.querySelector("#menu-success-2 .boxed-text-l");
    if (titleEl) titleEl.textContent = "Success!";
    if (messageEl) messageEl.textContent = message;
    openMenu("menu-success-2");
    setTimeout(() => closeMenu("menu-success-2"), 3000);
  }

  function showWarningNotification(message) {
    const titleEl = document.querySelector(
      "#menu-warning-2 .text-center.font-700"
    );
    const messageEl = document.querySelector("#menu-warning-2 .boxed-text-l");
    if (titleEl) titleEl.textContent = "Warning!";
    if (messageEl) messageEl.textContent = message;
    openMenu("menu-warning-2");
  }

  function handleSaveMember(e) {
    e && e.preventDefault();

    if (Object.keys(members).length >= 2) {
      showWarningNotification(
        "You can only add up to 2 members to keep your health tracking focused and manageable."
      );
      return;
    }

    const nameEl = document.getElementById("memberName");
    const dobEl = document.getElementById("memberDob");
    const genderEl = document.getElementById("memberGender");
    const weightEl = document.getElementById("memberWeight");
    const name = nameEl ? nameEl.value.trim() : "";
    const dob = dobEl ? dobEl.value : "";
    const gender = genderEl ? genderEl.value : "";
    const weight = weightEl ? weightEl.value.trim() : "";

    if (!name || !dob || !gender || !weight) {
      showWarningNotification(
        "All fields are required to create a complete member profile."
      );
      return;
    }

    if (!/^\d+(\.\d+)?$/.test(weight) || parseFloat(weight) <= 0) {
      showWarningNotification(
        "Please enter a valid weight in kilograms (numbers only)."
      );
      return;
    }

    const selectedDate = new Date(dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      showWarningNotification(
        "Date of birth cannot be in the future. Please select a valid date."
      );
      return;
    }

    const id = Date.now().toString();
    const copy = { ...members };
    copy[id] = { name, dob, gender, weight };
    setMembers(copy);

    showSuccessNotification(
      `${name} has been successfully added to your health tracker!`
    );

    if (nameEl) nameEl.value = "";
    if (dobEl) dobEl.value = "";
    if (genderEl) genderEl.value = "Male";
    if (weightEl) weightEl.value = "";

    closeMenu("menu-add-member");
  }

  function handleSaveBP(e) {
    e && e.preventDefault();
    const bpDate = (document.getElementById("bpDate") || {}).value;
    const bpTime = (document.getElementById("bpTime") || {}).value;
    const highBP = (
      (document.getElementById("highBP") || {}).value || ""
    ).trim();
    const lowBP = ((document.getElementById("lowBP") || {}).value || "").trim();

    if (!bpDate || !bpTime || !highBP || !lowBP) {
      showWarningNotification("Date, time, and both BP values are required.");
      return;
    }

    const selectedDateTime = new Date(`${bpDate}T${bpTime}`);
    const now = new Date();

    if (selectedDateTime > now) {
      showWarningNotification("Date and time cannot be in the future.");
      return;
    }

    if (parseInt(highBP) <= parseInt(lowBP)) {
      showWarningNotification(
        "High BP (Systolic) should be greater than Low BP (Diastolic)."
      );
      return;
    }

    if (!selectedMember || !members[selectedMember]) {
      showWarningNotification("Please select a member first.");
      return;
    }

    showSuccessNotification(
      `BP reading (${highBP}/${lowBP}) saved successfully for ${members[selectedMember].name}!`
    );

    ["bpDate", "bpTime", "highBP", "lowBP", "bpNote"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    closeMenu("menu-bp");
  }

  function handleSaveSugar(e) {
    e && e.preventDefault();
    const sugarDate = (document.getElementById("sugarDate") || {}).value;
    const sugarTime = (document.getElementById("sugarTime") || {}).value;
    const sugarType = (document.getElementById("sugarType") || {}).value;
    const sugarLevel = (
      (document.getElementById("sugarLevel") || {}).value || ""
    ).trim();

    if (!sugarDate || !sugarTime || !sugarType || !sugarLevel) {
      showWarningNotification(
        "Date, time, measurement type, and sugar level are all required."
      );
      return;
    }

    const selectedDateTime = new Date(`${sugarDate}T${sugarTime}`);
    const now = new Date();

    if (selectedDateTime > now) {
      showWarningNotification("Date and time cannot be in the future.");
      return;
    }

    if (parseFloat(sugarLevel) <= 0) {
      showWarningNotification("Please enter a valid sugar level value.");
      return;
    }

    if (!selectedMember || !members[selectedMember]) {
      showWarningNotification("Please select a member first.");
      return;
    }

    showSuccessNotification(
      `${sugarType} sugar reading (${sugarLevel} mg/dL) saved successfully for ${members[selectedMember].name}!`
    );

    ["sugarDate", "sugarTime", "sugarLevel", "sugarType", "sugarNote"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      }
    );

    closeMenu("menu-sugar");
  }

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  return (
    <div>
      <div className="header header-auto-show header-fixed header-logo-center">
        <a href="#" className="header-title">
          All Is Well
        </a>
      </div>

      <div className="page-title page-title-fixed">
        <h1>All Is Well</h1>
      </div>
      <div className="page-title-clear"></div>

      <div className="page-content">
        <div className="card card-style mb-3">
          <div className="content text-center">
            <a
              href="#"
              className="btn btn-full btn-l font-600 font-13 gradient-highlight rounded-s"
              onClick={(e) => {
                e.preventDefault();
                if (Object.keys(members).length >= 2) {
                  showWarningNotification(
                    "You can only add up to 2 members to keep your health tracking focused and manageable."
                  );
                  return;
                }
                openMenu("menu-add-member");
              }}
            >
              <i className="fa fa-user-plus me-2"></i>Add New Member
            </a>
            <p className="color-gray font-11 mt-2 mb-0">
              You can add up to 2 members
            </p>
          </div>
        </div>

        <div className="card card-style mb-3">
          {Object.keys(members).length === 0 ? (
            <div className="content text-center">
              <i className="fa fa-users color-gray font-40 mb-3"></i>
              <h4 className="color-gray">No Members Added</h4>
              <p className="color-gray font-11 mb-0">
                Add family members to track their health records
              </p>
            </div>
          ) : (
            <div className="row me-0 ms-0">
              {Object.entries(members).map(([id, member]) => {
                const age = calculateAge(member.dob);
                return (
                  <div key={id} className="col-6 pe-1 ps-1">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.selectMember(id);
                      }}
                      className="card card-style mx-0 mb-3"
                    >
                      <div className="content text-center">
                        <i className="fa fa-user-circle color-highlight font-40"></i>
                        <h4 className="pt-3 mb-0 font-16">{member.name}</h4>
                        <span className="color-theme font-11">
                          {member.gender}, {age} years
                        </span>
                        <span className="color-theme font-14 opacity-50 pt-2 d-block">
                          {member.weight} kg
                        </span>
                        <div className="mt-3 mb-2">
                          <button
                            className="btn btn-xs gradient-red rounded-s me-1"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              ev.preventDefault();
                              window.removeMember(id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          id="healthActionsSection"
          className="card card-style p-3"
          style={{ display: selectedMember ? "block" : "none" }}
        >
          <div className="mb-3">
            <h3 id="selectedMemberTitle" className="font-20 font-700 mb-1">
              {selectedMember && members[selectedMember]
                ? `${members[selectedMember].name}'s Health Records`
                : "Select a Member"}
            </h3>
            <p className="font-11 color-theme opacity-70 mb-0">
              Select an action to manage health records
            </p>
          </div>

          <a
            href="#"
            className="d-flex mb-3"
            onClick={(e) => {
              e.preventDefault();
              setDefaultDateTime();
              openMenu("menu-bp");
            }}
          >
            <div className="align-self-center">
              <span className="icon icon-s gradient-red color-white rounded-sm shadow-xxl">
                <i className="fa fa-heartbeat font-20"></i>
              </span>
            </div>
            <div className="align-self-center">
              <h5 className="ps-3 mb-n1 font-15">BP Logbook</h5>
              <span className="ps-3 font-11 color-theme opacity-70">
                Blood Pressure Records
              </span>
            </div>
            <div className="ms-auto text-end align-self-center">
              <i className="fa fa-angle-right color-theme"></i>
            </div>
          </a>

          <div className="divider my-3"></div>

          <a
            href="#"
            className="d-flex mb-3"
            onClick={(e) => {
              e.preventDefault();
              setDefaultDateTime();
              openMenu("menu-sugar");
            }}
          >
            <div className="align-self-center">
              <span className="icon icon-s gradient-blue color-white rounded-sm shadow-xxl">
                <i className="fa fa-tint font-20"></i>
              </span>
            </div>
            <div className="align-self-center">
              <h5 className="ps-3 mb-n1 font-15">Sugar Logbook</h5>
              <span className="ps-3 font-11 color-theme opacity-70">
                Blood Sugar Records
              </span>
            </div>
            <div className="ms-auto text-end align-self-center">
              <i className="fa fa-angle-right color-theme"></i>
            </div>
          </a>

          <div className="divider my-3"></div>

          <a href="#" className="d-flex">
            <div className="align-self-center">
              <span className="icon icon-s gradient-green color-white rounded-sm shadow-xxl">
                <i className="fa fa-chart-line font-20"></i>
              </span>
            </div>
            <div className="align-self-center">
              <h5 className="ps-3 mb-n1 font-15">Generate Report</h5>
              <span className="ps-3 font-11 color-theme opacity-70">
                Health Summary & Analysis
              </span>
            </div>
            <div className="ms-auto text-end align-self-center">
              <i className="fa fa-angle-right color-theme"></i>
            </div>
          </a>
        </div>
      </div>

      {/* Action Sheets / Modals */}

      {/* Add Member Menu */}
      <div
        id="menu-add-member"
        className="menu menu-box-bottom rounded-m"
        data-menu-height="420"
      >
        <div className="menu-title">
          <p className="color-highlight">Add New Family Member</p>
          <h1>Member Details</h1>
          <a
            href="#"
            className="close-menu"
            onClick={(e) => {
              e.preventDefault();
              closeMenu("menu-add-member");
            }}
          >
            <i className="fa fa-times-circle"></i>
          </a>
        </div>
        <div className="content">
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-user"></i>
            <input
              type="text"
              className="form-control validate-name"
              id="memberName"
              placeholder="Full Name"
            />
            <label htmlFor="memberName" className="color-highlight">
              Full Name
            </label>
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-calendar"></i>
            <input type="date" className="form-control" id="memberDob" />
            <label htmlFor="memberDob" className="color-highlight">
              Date of Birth
            </label>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders no-icon input-style-always-active mb-3">
            <label htmlFor="memberGender" className="color-highlight">
              Gender
            </label>
            <select id="memberGender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <span>
              <i className="fa fa-chevron-down"></i>
            </span>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-4">
            <i className="fa fa-weight"></i>
            <input
              type="number"
              className="form-control validate-number"
              id="memberWeight"
              placeholder="Weight in kg"
            />
            <label htmlFor="memberWeight" className="color-highlight">
              Weight (kg)
            </label>
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(required)</em>
          </div>
          <a
            href="#"
            className="btn btn-full btn-m shadow-l rounded-s font-600 gradient-green mt-n2"
            onClick={handleSaveMember}
          >
            Save Member
          </a>
        </div>
      </div>

      {/* BP Menu */}
      <div
        id="menu-bp"
        className="menu menu-box-bottom rounded-m"
        data-menu-height="520"
      >
        <div className="menu-title">
          <p className="color-highlight">Add Blood Pressure Reading</p>
          <h1>BP Logbook</h1>
          <a
            href="#"
            className="close-menu"
            onClick={(e) => {
              e.preventDefault();
              closeMenu("menu-bp");
            }}
          >
            <i className="fa fa-times-circle"></i>
          </a>
        </div>
        <div className="content">
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-calendar"></i>
            <input type="date" className="form-control" id="bpDate" />
            <label htmlFor="bpDate" className="color-highlight">
              Date
            </label>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-clock"></i>
            <input type="time" className="form-control" id="bpTime" />
            <label htmlFor="bpTime" className="color-highlight">
              Time
            </label>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-arrow-up"></i>
            <input
              type="number"
              className="form-control validate-number"
              id="highBP"
              placeholder="120"
            />
            <label htmlFor="highBP" className="color-highlight">
              High BP (Systolic)
            </label>
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-arrow-down"></i>
            <input
              type="number"
              className="form-control validate-number"
              id="lowBP"
              placeholder="80"
            />
            <label htmlFor="lowBP" className="color-highlight">
              Low BP (Diastolic)
            </label>
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active mb-4">
            <i className="fa fa-sticky-note"></i>
            <textarea
              className="form-control"
              id="bpNote"
              placeholder="Any notes or symptoms..."
            ></textarea>
            <label htmlFor="bpNote" className="color-highlight">
              Notes (Optional)
            </label>
          </div>
          <a
            href="#"
            className="btn btn-full btn-m shadow-l rounded-s font-600 gradient-red mt-n2"
            onClick={handleSaveBP}
          >
            Save BP Reading
          </a>
        </div>
      </div>

      {/* Sugar Menu */}
      <div
        id="menu-sugar"
        className="menu menu-box-bottom rounded-m"
        data-menu-height="520"
      >
        <div className="menu-title">
          <p className="color-highlight">Add Blood Sugar Reading</p>
          <h1>Sugar Logbook</h1>
          <a
            href="#"
            className="close-menu"
            onClick={(e) => {
              e.preventDefault();
              closeMenu("menu-sugar");
            }}
          >
            <i className="fa fa-times-circle"></i>
          </a>
        </div>
        <div className="content">
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-calendar"></i>
            <input type="date" className="form-control" id="sugarDate" />
            <label htmlFor="sugarDate" className="color-highlight">
              Date
            </label>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-clock"></i>
            <input type="time" className="form-control" id="sugarTime" />
            <label htmlFor="sugarTime" className="color-highlight">
              Time
            </label>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders no-icon input-style-always-active mb-3">
            <label htmlFor="sugarType" className="color-highlight">
              Measurement Type
            </label>
            <select id="sugarType">
              <option value="">Select Type</option>
              <option value="Fasting">Fasting</option>
              <option value="Before Breakfast">Before Breakfast</option>
              <option value="After Breakfast">After Breakfast</option>
              <option value="Before Lunch">Before Lunch</option>
              <option value="After Lunch">After Lunch</option>
              <option value="Before Dinner">Before Dinner</option>
              <option value="After Dinner">After Dinner</option>
              <option value="Random">Random</option>
            </select>
            <span>
              <i className="fa fa-chevron-down"></i>
            </span>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active validate-field mb-3">
            <i className="fa fa-tint"></i>
            <input
              type="number"
              className="form-control validate-number"
              id="sugarLevel"
              placeholder="120"
              step="0.1"
            />
            <label htmlFor="sugarLevel" className="color-highlight">
              Sugar Level (mg/dL)
            </label>
            <i className="fa fa-times disabled invalid color-red-dark"></i>
            <i className="fa fa-check disabled valid color-green-dark"></i>
            <em>(required)</em>
          </div>
          <div className="input-style has-borders has-icon input-style-always-active mb-4">
            <i className="fa fa-sticky-note"></i>
            <textarea
              className="form-control"
              id="sugarNote"
              placeholder="Any notes or symptoms..."
            ></textarea>
            <label htmlFor="sugarNote" className="color-highlight">
              Notes (Optional)
            </label>
          </div>
          <a
            href="#"
            className="btn btn-full btn-m shadow-l rounded-s font-600 gradient-blue mt-n2"
            onClick={handleSaveSugar}
          >
            Save Sugar Reading
          </a>
        </div>
      </div>

      {/* Success Box Modal */}
      <div
        id="menu-success-2"
        className="menu menu-box-modal bg-green-dark rounded-m"
        data-menu-height="310"
        data-menu-width="350"
      >
        <h1 className="text-center mt-4">
          <i className="fa fa-3x fa-check-circle scale-box color-white shadow-xl rounded-circle"></i>
        </h1>
        <h1 className="text-center mt-3 font-700 color-white">Success!</h1>
        <p className="boxed-text-l color-white opacity-70">
          Your action has been completed successfully.
        </p>
        <a
          href="#"
          className="close-menu btn btn-m btn-center-m button-s shadow-l rounded-s text-uppercase font-600 bg-white color-black"
          onClick={(e) => {
            e.preventDefault();
            closeMenu("menu-success-2");
          }}
        >
          Great, Thanks!
        </a>
      </div>

      {/* Warning Box Modal */}
      <div
        id="menu-warning-2"
        className="menu menu-box-modal bg-red-dark rounded-m"
        data-menu-height="310"
        data-menu-width="350"
      >
        <h1 className="text-center mt-4">
          <i className="fa fa-3x fa-times-circle scale-box color-white shadow-xl rounded-circle"></i>
        </h1>
        <h1 className="text-center mt-3 text-uppercase color-white font-700">
          Warning!
        </h1>
        <p className="boxed-text-l color-white opacity-70">
          Please check the information and try again.
        </p>
        <a
          href="#"
          className="close-menu btn btn-m btn-center-l button-s shadow-l rounded-s text-uppercase font-600 bg-white color-black"
          onClick={(e) => {
            e.preventDefault();
            closeMenu("menu-warning-2");
          }}
        >
          Got it, Thanks!
        </a>
      </div>

      {/* Confirmation Box Modal */}
      <div
        id="menu-option-2"
        className="menu menu-box-modal rounded-m"
        data-menu-height="300"
        data-menu-width="350"
      >
        <h1 className="text-center mt-4">
          <i className="fa fa-3x fa-info-circle scale-box color-blue-dark shadow-xl rounded-circle"></i>
        </h1>
        <h3 className="text-center mt-3 font-700">Are you sure?</h3>
        <p className="boxed-text-xl opacity-70">
          Please confirm before proceeding with this action.
        </p>
        <div className="row mb-0 me-3 ms-3">
          <div className="col-6">
            <a
              href="#"
              className="btn close-menu btn-full btn-m color-red-dark border-red-dark font-600 rounded-s"
            >
              No, cancel
            </a>
          </div>
          <div className="col-6">
            <a
              href="#"
              className="btn close-menu btn-full btn-m color-green-dark border-green-dark font-600 rounded-s"
            >
              Yes, continue!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
