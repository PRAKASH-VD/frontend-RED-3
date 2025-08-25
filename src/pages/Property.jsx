import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { propertyService } from "../services/propertyService";
import PropertyDetails from "../components/PropertyDetails";
import { inquiryService } from "../services/inquiryService";
import { appointmentService } from "../services/appointmentService";
import { propertyAddress, getPrimaryImage, formatCurrency } from "../utils";

export default function Property() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const {
    register: regInquiry,
    handleSubmit: submitInquiry,
    reset: resetInquiry,
    formState: { isSubmitting: sendingInquiry },
  } = useForm();

  const {
    register: regAppt,
    handleSubmit: submitAppt,
    reset: resetAppt,
    formState: { isSubmitting: sendingAppt },
  } = useForm();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await propertyService.get(id);
        setProperty(res);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const onSendInquiry = async (values) => {
    const propertyId = property?._id || property?.id;
    await inquiryService.create({
      propertyId,
      name: values.name,
      email: values.email,
      message: values.message?.trim(),
    });
    resetInquiry();
    alert("Inquiry sent to the agent.");
  };

  const onBookAppt = async (values) => {
    const propertyId = property?._id || property?.id;
      const datetime = new Date(`${values.date}T${values.time}`);

    await appointmentService.create({
      propertyId,
      datetime: datetime.toISOString(),
      note: values.note?.trim(),
    });
    resetAppt();
    alert("Appointment request submitted.");
  };

  if (loading) return <div className="container py-10">Loading...</div>;
  if (!property)
    return <div className="container py-10">Property not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
      {/* HERO */}
      {property?.images?.length ? (
        <img
          src={getPrimaryImage(property.images)}
          alt={property?.title}
          className="w-full max-h-[60vh] object-cover rounded-lg"
        />
      ) : null}

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-3">
          <h1 className="text-2xl font-semibold">
            {property?.title || property?.type}
          </h1>
          <div className="text-sm text-gray-600">
            {propertyAddress(property)}
          </div>
          <div className="text-2xl text-brand font-bold">
            {formatCurrency(property?.price)}
          </div>
          {/* ...existing description/specs/amenities... */}
        </div>

        {/* Right: actions */}
        <aside className="space-y-6">
          {!user ? (
            <div className="border rounded-lg p-4">
              <div className="font-medium">Sign in to contact the agent</div>
              <p className="text-sm text-gray-600 mt-1">
                Please log in to send an inquiry or book an appointment.
              </p>
              <a
                href="/login"
                className="btn mt-3 inline-block bg-gray-900 text-white px-4 py-2 rounded-md"
              >
                Login
              </a>
            </div>
          ) : (
            <>
              {/* Inquiry */}
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Send an inquiry</div>
                <form
                  className="space-y-3"
                  onSubmit={submitInquiry(onSendInquiry)}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    {...regInquiry("name", { required: true })}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    {...regInquiry("email", { required: true })}
                  />
                  <textarea
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    rows={4}
                    placeholder="Write your message to the agent…"
                    {...regInquiry("message", { required: true, minLength: 5 })}
                  />
                  <button
                    type="submit"
                    disabled={sendingInquiry}
                    className="w-full rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-gray-800 disabled:opacity-60"
                  >
                    {sendingInquiry ? "Sending…" : "Send inquiry"}
                  </button>
                </form>
              </div>

              {/* Appointment */}
              <div className="border rounded-lg p-4">
                <div className="font-medium mb-2">Book an appointment</div>
                <form
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  onSubmit={submitAppt(onBookAppt)}
                >
                  <div className="sm:col-span-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      {...regAppt("date", { required: true })}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-xs text-gray-600 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      {...regAppt("time", { required: true })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">
                      Note (optional)
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Any preferences or questions"
                      {...regAppt("note")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={sendingAppt}
                      className="w-full rounded-md bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {sendingAppt ? "Booking…" : "Request appointment"}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
