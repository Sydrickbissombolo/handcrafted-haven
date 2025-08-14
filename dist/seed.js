"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
var bcryptjs_1 = require("bcryptjs");
var prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var salt, sellerPwd, buyerPwd, seller, buyer, products, created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.hash('seller123', salt)];
                case 2:
                    sellerPwd = _a.sent();
                    return [4 /*yield*/, bcryptjs_1.default.hash('buyer123', salt)];
                case 3:
                    buyerPwd = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'seller@haven.test' },
                            update: {},
                            create: {
                                name: 'Ava Artisan',
                                email: 'seller@haven.test',
                                password: sellerPwd,
                                role: 'SELLER',
                                bio: 'Woodwork and hand-carved home décor.'
                            }
                        })];
                case 4:
                    seller = _a.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'buyer@haven.test' },
                            update: {},
                            create: {
                                name: 'Ben Buyer',
                                email: 'buyer@haven.test',
                                password: buyerPwd,
                                role: 'BUYER'
                            }
                        })];
                case 5:
                    buyer = _a.sent();
                    return [4 /*yield*/, prisma.product.createMany({
                            data: [
                                {
                                    title: 'Hand-Carved Wooden Bowl',
                                    description: 'Sustainably sourced teak, food-safe finish.',
                                    price: 45.00,
                                    imageUrl: 'https://images.unsplash.com/photo-1540304801-6cf9f8d0d2ae?q=80&w=1200',
                                    category: 'Home & Kitchen',
                                    sellerId: seller.id
                                },
                                {
                                    title: 'Macramé Wall Hanging',
                                    description: '100% cotton, boho inspired.',
                                    price: 60.00,
                                    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200',
                                    category: 'Home Decor',
                                    sellerId: seller.id
                                },
                                {
                                    title: 'Hand-thrown Ceramic Mug',
                                    description: 'Stoneware, microwave safe.',
                                    price: 24.00,
                                    imageUrl: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=1200',
                                    category: 'Kitchenware',
                                    sellerId: seller.id
                                }
                            ]
                        })];
                case 6:
                    products = _a.sent();
                    return [4 /*yield*/, prisma.product.findMany()];
                case 7:
                    created = _a.sent();
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                rating: 5,
                                comment: 'Beautiful craftsmanship and fast shipping!',
                                productId: created[0].id,
                                authorId: buyer.id
                            }
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                rating: 4,
                                comment: 'Looks great on my wall.',
                                productId: created[1].id,
                                authorId: buyer.id
                            }
                        })];
                case 9:
                    _a.sent();
                    console.log('Seed complete:', { users: [seller.email, buyer.email], products: created.length });
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) { console.error(e); process.exit(1); })
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, prisma.$disconnect()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); });
