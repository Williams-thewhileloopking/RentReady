import React, { useState } from "react";

function TenantForm() {
  const [formData, setFormData] = useState({
    agreement_date: "",
    landlord_name: "",
    landlord_address: "",
    tenant_name: "",
    property_address: "",
    move_in_date: "",
    move_out_date: "",
    rent_amount: "",
    rent_due_day: "",
    payment_method: "",
    security_deposit: "",
    utilities_list: "",
    termination_notice_period: "",
    landlord_signature_date: "",
    tenant_signature_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("Submitting form data:", formData);

  try {
    const response = await fetch("http://127.0.0.1:5000/generate-agreement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Response received, processing download.");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tenant_agreement_filled.pdf";  // Make sure the filename matches
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
    } else {
      const errorData = await response.json();
      console.error("Error generating agreement:", errorData.error);
      alert("Error generating agreement: " + errorData.error);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error occurred: " + error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Agreement Date:</label>
        <input
          type="date"
          name="agreement_date"
          value={formData.agreement_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Landlord Name:</label>
        <input
          type="text"
          name="landlord_name"
          value={formData.landlord_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Landlord Address:</label>
        <input
          type="text"
          name="landlord_address"
          value={formData.landlord_address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tenant Name:</label>
        <input
          type="text"
          name="tenant_name"
          value={formData.tenant_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Property Address:</label>
        <input
          type="text"
          name="property_address"
          value={formData.property_address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Move-in Date:</label>
        <input
          type="date"
          name="move_in_date"
          value={formData.move_in_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Move-out Date:</label>
        <input
          type="date"
          name="move_out_date"
          value={formData.move_out_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rent Amount:</label>
        <input
          type="number"
          name="rent_amount"
          value={formData.rent_amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Rent Due Day:</label>
        <input
          type="text"
          name="rent_due_day"
          value={formData.rent_due_day}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <input
          type="text"
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Security Deposit:</label>
        <input
          type="number"
          name="security_deposit"
          value={formData.security_deposit}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Utilities List:</label>
        <input
          type="text"
          name="utilities_list"
          value={formData.utilities_list}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Termination Notice Period:</label>
        <input
          type="text"
          name="termination_notice_period"
          value={formData.termination_notice_period}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Landlord Signature Date:</label>
        <input
          type="date"
          name="landlord_signature_date"
          value={formData.landlord_signature_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tenant Signature Date:</label>
        <input
          type="date"
          name="tenant_signature_date"
          value={formData.tenant_signature_date}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Generate Agreement</button>
    </form>
  );
}

export default TenantForm;
