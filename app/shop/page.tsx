import ProductList from "../components/ProductList";

export default function ShopPage() {
    return (
        <div className="container my-20">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Shop</h1>
                <p className="text-sm text-zinc-600">
                    Browse all products Available product in the shop.
                </p>
            </div>
            <ProductList />
        </div>
    );
}
