import { useEffect, useState } from "react";

export default function Drawer({isopen, onclose}) {
    console.log(isopen);
    
    const [isOpen, setIsOpen] = useState(false)
    
   useEffect(() => {
    setIsOpen(isopen);
  }, [isopen]);

  return (
    <div className="p-6">
      {/* دکمه باز کردن */}
      

      {/* بک‌دراپ تار */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onclose}
        />
      )}

      {/* پنل کشویی */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"} w-1/2`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">پنل اطلاعات</h2>
          <button
            onClick={onclose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-right">
          <p>اینجا می‌تونی هر محتوایی بزاری</p>
          <p>مثلاً فرم، لیست محصولات یا هرچیز دیگه</p>
        </div>
      </div>
    </div>
  );
}
