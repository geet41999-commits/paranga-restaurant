import React, { useState } from 'react';
import { RESTAURANT_INFO, FAQS } from '../data/restaurantData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#201811] via-[#16120e] to-[#201811] border border-[#3b2d1d] p-6 sm:p-10">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#352718] border border-[#c99a4e]/40 text-[#e4b568] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Find & Connect With Us</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif-heading text-[#f7efe1]">
            Contact Paranga Karol Bagh
          </h1>
          <p className="text-xs sm:text-sm text-[#b5a591] leading-relaxed">
            We are conveniently located in Channa Market, Karol Bagh, beside Hotel Crown Dlx. Drop by for dining, call for reservations, or reach out for event catering inquiries.
          </p>
        </div>
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Address */}
        <div className="p-5 rounded-2xl bg-[#16120e] border border-[#302517] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#281f15] text-[#e4b568] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">Our Location</h4>
          <p className="text-xs text-[#a89984] leading-relaxed">
            {RESTAURANT_INFO.address}
          </p>
          <a
            href="https://maps.google.com/?q=Paranga+Karol+Bagh+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#c99a4e] hover:underline pt-1"
          >
            <span>Get Directions</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Phones */}
        <div className="p-5 rounded-2xl bg-[#16120e] border border-[#302517] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#281f15] text-[#e4b568] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">Phone Lines</h4>
          <div className="space-y-1 text-xs">
            <div>
              <a href={`tel:${RESTAURANT_INFO.phone1}`} className="text-[#f7efe1] font-semibold hover:text-[#e4b568]">
                {RESTAURANT_INFO.phone1}
              </a>
              <span className="text-[10px] text-[#8e7e68] block">Mobile / Reservations</span>
            </div>
            <div>
              <a href={`tel:${RESTAURANT_INFO.phone2}`} className="text-[#f7efe1] font-semibold hover:text-[#e4b568]">
                {RESTAURANT_INFO.phone2}
              </a>
              <span className="text-[10px] text-[#8e7e68] block">Landline</span>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="p-5 rounded-2xl bg-[#16120e] border border-[#302517] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#281f15] text-[#e4b568] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">Email Inquiry</h4>
          <a
            href={`mailto:${RESTAURANT_INFO.email}`}
            className="text-xs text-[#f7efe1] hover:text-[#e4b568] font-semibold break-all block"
          >
            {RESTAURANT_INFO.email}
          </a>
          <p className="text-[11px] text-[#8e7e68]">
            For bulk orders, banquet bookings & feedback
          </p>
        </div>

        {/* Hours */}
        <div className="p-5 rounded-2xl bg-[#16120e] border border-[#302517] space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#281f15] text-[#e4b568] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-[#f7efe1] uppercase tracking-wider">Hours of Operation</h4>
          <p className="text-xs font-semibold text-[#f7efe1]">
            Monday – Sunday
          </p>
          <p className="text-xs text-[#e4b568] font-bold">
            11:00 AM – 11:30 PM
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold">
            Dine-In, Takeaway & Delivery
          </span>
        </div>
      </div>

      {/* Map & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 rounded-3xl bg-[#16120e] border border-[#362b1d] p-6 sm:p-8">
          <div className="mb-6 space-y-1">
            <h3 className="text-xl font-bold font-serif-heading text-[#f7efe1]">
              Send Us a Message
            </h3>
            <p className="text-xs text-[#a39480]">
              Inquire about catering, private celebrations, or share your dining experience.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#1e1711] border border-emerald-500/50 space-y-4 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-[#f7efe1]">Thank You, {formData.name}!</h4>
              <p className="text-xs text-[#b8a994] max-w-md mx-auto">
                We have received your message. Our restaurant manager will reach back to you at {formData.phone} shortly.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', inquiryType: 'General Inquiry', message: '' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#c99a4e]"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d4c6b2] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Gupta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2d1d] text-[#f7efe1] placeholder-[#70614f] focus:outline-none focus:border-[#c99a4e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4c6b2] mb-1.5">
                    Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9891450503"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2d1d] text-[#f7efe1] placeholder-[#70614f] focus:outline-none focus:border-[#c99a4e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d4c6b2] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ananya@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2d1d] text-[#f7efe1] placeholder-[#70614f] focus:outline-none focus:border-[#c99a4e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d4c6b2] mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2d1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Outdoor Catering">Outdoor Catering</option>
                    <option value="Birthday / Kitty Party">Birthday / Kitty Party</option>
                    <option value="Feedback / Experience">Feedback / Experience</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#d4c6b2] mb-1.5">
                  Message / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you need..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#221a13] border border-[#3b2d1d] text-[#f7efe1] placeholder-[#70614f] focus:outline-none focus:border-[#c99a4e]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Map & Landmark Card */}
        <div className="lg:col-span-5 rounded-3xl bg-[#16120e] border border-[#362b1d] p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-serif-heading text-[#f7efe1]">
              Location & Nearby Landmarks
            </h3>
            <p className="text-xs text-[#a39480] mt-1">
              Convenient access from Karol Bagh Metro Station (Blue Line) and Ajmal Khan Road shopping district.
            </p>

            <div className="my-4 rounded-2xl overflow-hidden border border-[#362a1c] bg-[#221a12] p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#e4b568] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#f7efe1]">Channa Market Landmark</h4>
                  <p className="text-[11px] text-[#b8a994] mt-0.5 leading-relaxed">
                    Situated in Block 8A, WEA, adjacent to Hotel Crown Dlx. Parking assistance available nearby.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#17120d] border border-[#2d2215] text-[11px] text-[#9c8b76]">
                🚇 <strong className="text-[#f7efe1]">Metro:</strong> 650m from Karol Bagh Metro Station (Gate 1). Auto-rickshaws available directly to Channa Market.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#221a12] border border-[#453521] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#f7efe1]">Need Instant Directions?</span>
              <p className="text-[10px] text-[#a3947f]">Open straight into Google Maps</p>
            </div>
            <a
              href="https://maps.google.com/?q=8A/36,+8A,+Beside+Hotel+Crown+Dlx,+Channa+Market,+Karol+Bagh,+New+Delhi-110005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all"
            >
              <span>View Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#c99a4e] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-[#f7efe1]">
            Common Inquiries About Dining At Paranga
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#16120e] border border-[#302517] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#f7efe1] hover:text-[#e4b568] transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#c99a4e] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8f7e68] flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 border-t border-[#261d13] text-xs text-[#aba08f] leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
