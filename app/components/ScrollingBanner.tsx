const text = "Free Delivery all over DHAKA";
const items = Array(8).fill(text);

const BannerContent = () => (
    <div className="flex shrink-0 items-center">
        {items.map((item, index) => (
            <div key={index} className="flex items-center">
                <span className="mx-8 text-[22px] font-bold text-black">{item}</span>
                <svg className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            </div>
        ))}
    </div>
);

export default function ScrollingBanner() {
    return (
        <div className="relative flex w-full overflow-hidden bg-[#ffc629] py-4">
            <div className="flex animate-marquee whitespace-nowrap">
                <BannerContent />
                <BannerContent />
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 35s linear infinite;
                }
            `,
                }}
            />
        </div>
    );
}
