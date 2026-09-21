import React, { useState } from 'react';
import { BookingRequest } from '../types';
import { RESTAURANT_INFO, BOOKING_SERVICES } from '../data/restaurantData';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Phone,
  PartyPopper,
  Info,
  MapPin,
} from 'lucide-react';

export const BookingScreen: React.FC = () => {
  const [formData, setFormData] = useState<BookingRequest>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '7:30 PM',
    guests: 2,
    eventType: 'Casual Dining',
    seatingArea: 'Main Dining Hall',
    specialNotes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<BookingRequest | null>(null);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
    '11:30 AM',
    '12:30 PM',
    '1:30 PM',
    '2:30 PM',
    '3:30 PM',
    '6:30 PM',
    '7:30 PM',
    '8:30 PM',
    '9:30 PM',
    '10:30 PM',
  ];

  const occasions = [
    'Casual Dining',
    'Birthday Celebration',
    'Kitty Party',
    'Anniversary Special',
    'Corporate Lunch/Dinner',
    'Family Get-Together',
    'Outdoor Catering Event',
  ];

  const seatingAreas = [
    'Main Dining Hall (Ambient Music)',
    'Cozy Corner Booth',
    'Family Private Section',
    'Quiet Area (Corporate/Meetings)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const ref = `PAR-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setBookingConfirmed({ ...formData });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#201811] via-[#16120e] to-[#201811] border border-[#3d2f1f] p-6 sm:p-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#352618] border border-[#c99a4e]/40 text-[#e4b568] text-xs font-bold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Table Reservations & Event Bookings</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1]">
            Reserve Your Table at Paranga Karol Bagh
          </h1>
          <p className="text-xs sm:text-sm text-[#b5a591] leading-relaxed">
            Guarantee zero waiting time for family lunches, celebratory birthday bashes, kitty parties, and corporate dining. We also cater outdoor gatherings across Delhi NCR.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Reservation Form */}
        <div className="lg:col-span-8">
          {bookingConfirmed ? (
            /* Confirmation Pass Card */
            <div className="rounded-3xl bg-[#17130f] border-2 border-[#c99a4e] p-6 sm:p-10 shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 text-emerald-400">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f7efe1] font-serif-heading">
                    Table Reservation Confirmed!
                  </h3>
                  <p className="text-xs text-[#b0a08c]">
                    Booking Reference: <span className="font-mono font-bold text-[#e4b568]">{bookingRef}</span>
                  </p>
                </div>
              </div>

              {/* Booking Pass Details */}
              <div className="p-6 rounded-2xl bg-[#201913] border border-[#3b2e1d] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-[#302416] text-xs">
                  <div>
                    <span className="text-[#8e7e68] block">Guest Name</span>
                    <span className="font-bold text-[#f7efe1] text-sm">{bookingConfirmed.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[#8e7e68] block">Date</span>
                    <span className="font-bold text-[#f7efe1] text-sm">{bookingConfirmed.date}</span>
                  </div>
                  <div>
                    <span className="text-[#8e7e68] block">Time Slot</span>
                    <span className="font-bold text-[#e4b568] text-sm">{bookingConfirmed.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[#8e7e68] block">Party Size</span>
                    <span className="font-bold text-[#f7efe1] text-sm">{bookingConfirmed.guests} Guests</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#b8a994]">
                  <div>
                    <span className="text-[#8e7e68]">Occasion:</span>{' '}
                    <span className="font-semibold text-[#f7efe1]">{bookingConfirmed.eventType}</span>
                  </div>
                  <div>
                    <span className="text-[#8e7e68]">Seating Section:</span>{' '}
                    <span className="font-semibold text-[#f7efe1]">{bookingConfirmed.seatingArea}</span>
                  </div>
                  <div>
                    <span className="text-[#8e7e68]">Contact Phone:</span>{' '}
                    <span className="font-semibold text-[#f7efe1]">{bookingConfirmed.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#8e7e68]">Venue:</span>{' '}
                    <span className="font-semibold text-[#f7efe1]">Paranga, Channa Market Karol Bagh</span>
                  </div>
                </div>

                {bookingConfirmed.specialNotes && (
                  <div className="pt-2 text-xs text-[#b8a994] border-t border-[#302416]">
                    <span className="text-[#8e7e68]">Special Requests:</span> {bookingConfirmed.specialNotes}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <a
                  href={`tel:${RESTAURANT_INFO.phone1}`}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Restaurant Manager</span>
                </a>

                <button
                  onClick={() => setBookingConfirmed(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-[#d4c6b2] bg-[#221a12] hover:bg-[#2d2318] border border-[#423321] transition-all"
                >
                  Make Another Reservation
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-[#16120e] border border-[#362b1d] p-6 sm:p-8 space-y-6 shadow-xl"
              id="table-booking-form"
            >
              <div className="border-b border-[#292015] pb-4">
                <h3 className="text-lg font-bold text-[#f7efe1] font-serif-heading">
                  1. Select Date, Time & Occasion
                </h3>
                <p className="text-xs text-[#9c8c77]">Choose your preferred dining slot</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                    Dining Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                    Number of Guests *
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      required
                      min={1}
                      max={50}
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                    />
                    <span className="text-xs text-[#8f7e68] whitespace-nowrap">People</span>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                    Occasion
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-[#d6c7b3] mb-2">
                  Select Time Slot *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center ${
                        formData.timeSlot === slot
                          ? 'bg-[#c99a4e] text-black font-bold shadow-md'
                          : 'bg-[#221a13] text-[#b8a994] hover:bg-[#2e2319] border border-[#382b1c]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-semibold text-[#d6c7b3] mb-2">
                  Seating Section Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {seatingAreas.map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setFormData({ ...formData, seatingArea: area })}
                      className={`p-3 rounded-xl text-xs font-medium text-left transition-all border ${
                        formData.seatingArea === area
                          ? 'bg-[#291f14] border-[#c99a4e] text-[#f7efe1]'
                          : 'bg-[#201812] border-[#362a1c] text-[#a3947f] hover:bg-[#251d16]'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Information */}
              <div className="border-t border-[#292015] pt-5 space-y-4">
                <h3 className="text-lg font-bold text-[#f7efe1] font-serif-heading">
                  2. Primary Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] placeholder-[#736452] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                      Mobile Number (For SMS/Call Confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98914 50503"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] placeholder-[#736452] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] placeholder-[#736452] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c7b3] mb-1.5">
                      Special Requests / Dietary Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Birthday cake candle, less spicy, high chair"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2e1d] text-[#f7efe1] placeholder-[#736452] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  id="confirm-booking-btn"
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-[#e4b568] via-[#c99a4e] to-[#ab7c34] hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#c99a4e]/20"
                >
                  Confirm Table Reservation
                </button>
                <p className="text-[11px] text-center text-[#8a7a66] mt-2">
                  No advance deposit required. We hold your table for up to 15 minutes past your slot.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info / Perks */}
        <div className="lg:col-span-4 space-y-6">
          {/* Party Perks Card */}
          <div className="p-6 rounded-3xl bg-[#19140f] border border-[#382b1b] space-y-4">
            <div className="flex items-center space-x-2 text-[#c99a4e]">
              <PartyPopper className="w-5 h-5" />
              <h4 className="text-sm font-bold text-[#f7efe1]">Birthday & Kitty Party Perks</h4>
            </div>

            <ul className="text-xs text-[#b8a994] space-y-2.5">
              <li className="flex items-start space-x-2">
                <span className="text-[#c99a4e] font-bold">•</span>
                <span>Complimentary table decoration and festive sparkler candle for groups 6+.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#c99a4e] font-bold">•</span>
                <span>Dedicated steward service and tailored fixed-price party platters.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#c99a4e] font-bold">•</span>
                <span>Choice of Bollywood or lounge ambient playlist in private dining areas.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-[#2d2216]">
              <p className="text-[11px] text-[#91816e]">
                For party custom cakes or balloon arrangements, please notify us 3 hours in advance.
              </p>
            </div>
          </div>

          {/* Quick Contact & Address Card */}
          <div className="p-6 rounded-3xl bg-[#19140f] border border-[#382b1b] space-y-4">
            <div className="flex items-center space-x-2 text-[#c99a4e]">
              <MapPin className="w-5 h-5" />
              <h4 className="text-sm font-bold text-[#f7efe1]">Location & Assistance</h4>
            </div>

            <p className="text-xs text-[#b8a994] leading-relaxed">
              {RESTAURANT_INFO.address}
            </p>

            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center justify-between text-[#b8a994]">
                <span>Manager Helpline:</span>
                <a href={`tel:${RESTAURANT_INFO.phone1}`} className="text-[#e4b568] font-bold">
                  {RESTAURANT_INFO.phone1}
                </a>
              </div>
              <div className="flex items-center justify-between text-[#b8a994]">
                <span>Landline:</span>
                <a href={`tel:${RESTAURANT_INFO.phone2}`} className="text-[#e4b568]">
                  {RESTAURANT_INFO.phone2}
                </a>
              </div>
              <div className="flex items-center justify-between text-[#b8a994]">
                <span>Dining Hours:</span>
                <span className="text-[#f7efe1]">11:00 AM – 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
