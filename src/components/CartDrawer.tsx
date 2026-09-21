import React, { useState } from 'react';
import { CartItem, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Clock,
  Sparkles,
  CheckCircle2,
  ChefHat,
  Bike,
  Utensils,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'dinein' | 'delivery'>('dinein');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = orderType === 'delivery' ? (subtotal > 499 ? 0 : 40) : 0;
  const grandTotal = subtotal + gst + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `#PG-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmed({
      orderId,
      orderType,
      tableNumber,
      deliveryAddress,
      customerName: customerName || 'Guest Diner',
      customerPhone: customerPhone || '9891450503',
      items: [...cart],
      grandTotal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-[#15110d] border-l border-[#3a2e1e] flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#292015] bg-[#1a140f]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#2b2116] text-[#c99a4e]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#f7efe1] font-serif-heading">
                Your Paranga Order
              </h3>
              <p className="text-[10px] text-[#9c8b76]">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#ad9d88] hover:text-white bg-[#221a13] hover:bg-[#2d2319]"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed View */}
        {orderConfirmed ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#f7efe1] font-serif-heading">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-[#c99a4e] font-mono font-bold">
                Order ID: {orderConfirmed.orderId}
              </p>
              <p className="text-xs text-[#a69784] pt-1">
                Estimated preparation: <strong className="text-white">20-25 mins</strong>
              </p>
            </div>

            {/* Live Progress Tracker */}
            <div className="p-4 rounded-2xl bg-[#1e1711] border border-[#382b1c] text-left space-y-3">
              <span className="text-[11px] font-bold text-[#e4b568] uppercase tracking-wider block">
                Live Kitchen Status
              </span>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span className="text-[#f7efe1] font-semibold">Order Received & Billed</span>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#c99a4e] text-black flex items-center justify-center animate-pulse">
                    <ChefHat className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[#f7efe1] font-semibold">Cooking on Tandoor & Wok</span>
                </div>

                <div className="flex items-center space-x-3 text-xs opacity-50">
                  <div className="w-6 h-6 rounded-full bg-[#2a2016] text-[#8e7d69] flex items-center justify-center">
                    {orderConfirmed.orderType === 'dinein' ? (
                      <Utensils className="w-3 h-3" />
                    ) : (
                      <Bike className="w-3 h-3" />
                    )}
                  </div>
                  <span className="text-[#8e7d69]">
                    {orderConfirmed.orderType === 'dinein'
                      ? `Serving to ${orderConfirmed.tableNumber}`
                      : 'Out for Karol Bagh Delivery'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1a140f] border border-[#332719] text-xs text-left space-y-2">
              <div className="flex justify-between text-[#a39480]">
                <span>Recipient:</span>
                <span className="text-[#f7efe1] font-medium">{orderConfirmed.customerName}</span>
              </div>
              <div className="flex justify-between text-[#a39480]">
                <span>Type:</span>
                <span className="text-[#f7efe1] font-medium uppercase">{orderConfirmed.orderType}</span>
              </div>
              <div className="flex justify-between text-[#a39480]">
                <span>Total Amount Paid:</span>
                <span className="text-[#e4b568] font-bold">₹{orderConfirmed.grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderConfirmed(null);
                onClose();
              }}
              className="w-full py-3 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568] transition-all"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#221a12] text-[#806f59] flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-[#f7efe1]">Your Order is Empty</h4>
            <p className="text-xs text-[#9c8a75] max-w-xs leading-relaxed">
              Explore our North Indian gravies, steaming momos, and continental sizzlers to add items.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#c99a4e] hover:bg-[#e4b568]"
            >
              Browse Menu Now
            </button>
          </div>
        ) : (
          /* Cart Content List & Form */
          <form onSubmit={handleCheckout} className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {/* Order Type Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#201913] border border-[#35281a]">
                <button
                  type="button"
                  onClick={() => setOrderType('dinein')}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                    orderType === 'dinein'
                      ? 'bg-[#c99a4e] text-black font-bold shadow-sm'
                      : 'text-[#9c8a75] hover:text-white'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dine-In (QR Table)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                    orderType === 'delivery'
                      ? 'bg-[#c99a4e] text-black font-bold shadow-sm'
                      : 'text-[#9c8a75] hover:text-white'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Takeaway / Delivery</span>
                </button>
              </div>

              {/* Items Card List */}
              <div className="space-y-2.5 pt-1">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="p-3 rounded-xl bg-[#1c1611] border border-[#2e2417] flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#2b2116]"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://paranga.in/images/g1.jpg';
                        }}
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-[#f7efe1] truncate font-serif-heading">
                          {cartItem.item.name}
                        </h4>
                        <span className="text-xs font-bold text-[#e4b568]">
                          ₹{cartItem.item.price * cartItem.quantity}
                        </span>
                        <span className="text-[10px] text-[#82725e] ml-1.5">
                          (₹{cartItem.item.price} each)
                        </span>
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center space-x-1.5 bg-[#251d15] border border-[#3d2e1c] rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="p-1 rounded text-[#b8a792] hover:text-white hover:bg-white/10"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#f5efe6] w-5 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="p-1 rounded text-[#b8a792] hover:text-white hover:bg-white/10"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Instructions & Details */}
              <div className="pt-2 space-y-3">
                {orderType === 'dinein' ? (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#b8a792] mb-1">
                      Table Number (Optional if scanned)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4 or Bar Counter"
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#201913] border border-[#3b2d1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#b8a792] mb-1">
                      Delivery Address / Landmark (Karol Bagh area) *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House / Flat no, Channa Market, Ajmal Khan Road"
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#201913] border border-[#3b2d1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#b8a792] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aman"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#201913] border border-[#3b2d1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#b8a792] mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9891450503"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#201913] border border-[#3b2d1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#b8a792] mb-1">
                    Cooking Instructions / Less Spicy / Extra Onions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Less spicy butter chicken, extra green chutney"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#201913] border border-[#3b2d1d] text-[#f7efe1] focus:outline-none focus:border-[#c99a4e]"
                  />
                </div>
              </div>
            </div>

            {/* Bill Summary & Place Order */}
            <div className="p-4 border-t border-[#292015] bg-[#1a140f] space-y-3">
              <div className="space-y-1.5 text-xs text-[#a39480]">
                <div className="flex justify-between">
                  <span>Item Subtotal:</span>
                  <span className="text-[#f7efe1] font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Restaurant GST (5%):</span>
                  <span className="text-[#f7efe1] font-medium">₹{gst}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Charges:</span>
                    <span className="text-[#f7efe1] font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-bold">FREE (Orders &gt; ₹499)</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#f7efe1] pt-1.5 border-t border-[#2d2216]">
                  <span>Grand Total:</span>
                  <span className="text-[#e4b568]">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                id="cart-place-order-btn"
                className="w-full py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#e4b568] via-[#c99a4e] to-[#ab7c34] hover:brightness-110 active:scale-[0.99] transition-all shadow-md shadow-[#c99a4e]/20"
              >
                Place Order • ₹{grandTotal}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
