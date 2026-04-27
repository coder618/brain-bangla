import ProductList from "../components/ProductList";

export default function ShopPage() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Shop</h1>
                <p className="text-sm text-zinc-600">
                    Browse all products loaded from <code>/product-data/*.json</code>.
                </p>
            </div>
            <ProductList />
        </div>
    );
}
