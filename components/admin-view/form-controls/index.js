"use client";

export default function FormControls({ controls, formData, setFormData }) {
  return controls.map((controlsItem) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {controlsItem.label}
      </label>
      <input
        placeholder={controlsItem.placeholder}
        type={controlsItem.type}
        name={controlsItem.name}
        id={controlsItem.name}
        value={formData[controlsItem.name]}
        onChange={(e) => {
          setFormData({ ...formData, [controlsItem.name]: e.target.value });
        }}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 tracking-wide focus:outline-none"
      />
    </div>
  ));
}
