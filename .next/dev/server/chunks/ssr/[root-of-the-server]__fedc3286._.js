module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeHotkey, {}, void 0, false, {
                fileName: "[project]/OneDrive/Área de Trabalho/Salve/Salve-front/components/theme-provider.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Área de Trabalho/Salve/Salve-front/components/theme-provider.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
function isTypingTarget(target) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    return target.isContentEditable || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";
}
function ThemeHotkey() {
    const { resolvedTheme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        function onKeyDown(event) {
            if (event.defaultPrevented || event.repeat) {
                return;
            }
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }
            if (event.key.toLowerCase() !== "d") {
                return;
            }
            if (isTypingTarget(event.target)) {
                return;
            }
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }
        window.addEventListener("keydown", onKeyDown);
        return ()=>{
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [
        resolvedTheme,
        setTheme
    ]);
    return null;
}
;
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiException",
    ()=>ApiException,
    "deleteMe",
    ()=>deleteMe,
    "getMe",
    ()=>getMe,
    "login",
    ()=>login,
    "register",
    ()=>register,
    "removeToken",
    ()=>removeToken,
    "setToken",
    ()=>setToken,
    "updateMe",
    ()=>updateMe
]);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
class ApiException extends Error {
    status;
    constructor(message, status){
        super(message);
        this.status = status;
        this.name = "ApiException";
    }
}
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function setToken(token) {
    localStorage.setItem("auth_token", token);
}
function removeToken() {
    localStorage.removeItem("auth_token");
}
async function request(endpoint, options = {}) {
    const { method = "GET", body, headers = {} } = options;
    const token = getToken();
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...headers
        }
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (response.status === 204) {
        return undefined;
    }
    const data = await response.json();
    if (!response.ok) {
        const error = data;
        throw new ApiException(error.message ?? "An unexpected error occurred.", response.status);
    }
    return data;
}
async function login(email, password) {
    return request("/auth/login", {
        method: "POST",
        body: {
            email,
            password
        }
    });
}
async function register(name, email, password) {
    return request("/auth/register", {
        method: "POST",
        body: {
            name,
            email,
            password
        }
    });
}
async function getMe() {
    return request("/users/me");
}
async function updateMe(data) {
    return request("/users/me", {
        method: "PUT",
        body: data
    });
}
async function deleteMe() {
    return request("/users/me", {
        method: "DELETE"
    });
}
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/hooks/use-auth.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setIsLoading(false);
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMe"])().then(setUser).catch(()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeToken"])();
        }).finally(()=>setIsLoading(false));
    }, []);
    const handleAuthResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((response)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setToken"])(response.token);
        setUser(response.user);
    }, []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password)=>{
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"])(email, password);
        handleAuthResponse(response);
    }, [
        handleAuthResponse
    ]);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (name, email, password)=>{
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["register"])(name, email, password);
        handleAuthResponse(response);
    }, [
        handleAuthResponse
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeToken"])();
        setUser(null);
    }, []);
    const updateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (data)=>{
        const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateMe"])(data);
        setUser(updated);
    }, []);
    const deleteAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteMe"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeToken"])();
        setUser(null);
    }, []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
            updateProfile,
            deleteAccount
        }), [
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        deleteAccount
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/OneDrive/Área de Trabalho/Salve/Salve-front/hooks/use-auth.tsx",
        lineNumber: 118,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>J,
    "useTheme",
    ()=>z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Salve/Salve-front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
var M = (e, i, s, u, m, a, l, h)=>{
    let d = document.documentElement, w = [
        "light",
        "dark"
    ];
    function p(n) {
        (Array.isArray(e) ? e : [
            e
        ]).forEach((y)=>{
            let k = y === "class", S = k && a ? m.map((f)=>a[f] || f) : m;
            k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
        }), R(n);
    }
    function R(n) {
        h && w.includes(n) && (d.style.colorScheme = n);
    }
    function c() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (u) p(u);
    else try {
        let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
        p(y);
    } catch (n) {}
};
var b = [
    "light",
    "dark"
], I = "(prefers-color-scheme: dark)", O = ("TURBOPACK compile-time value", "undefined") == "undefined", x = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](void 0), U = {
    setTheme: (e)=>{},
    themes: []
}, z = ()=>{
    var e;
    return (e = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](x)) != null ? e : U;
}, J = (e)=>__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](x) ? __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], null, e.children) : __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](V, {
        ...e
    }), N = [
    "light",
    "dark"
], V = ({ forcedTheme: e, disableTransitionOnChange: i = !1, enableSystem: s = !0, enableColorScheme: u = !0, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R })=>{
    let [c, n] = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>H(m, l)), [T, y] = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>c === "system" ? E() : c), k = d ? Object.values(d) : a, S = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = o;
        if (!r) return;
        o === "system" && s && (r = E());
        let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = (g)=>{
            g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
        };
        if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
            let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
            P.style.colorScheme = D;
        }
        C == null || C();
    }, [
        p
    ]), f = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = typeof o == "function" ? o(c) : o;
        n(r);
        try {
            localStorage.setItem(m, r);
        } catch (v) {}
    }, [
        c
    ]), A = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = E(o);
        y(r), c === "system" && s && !e && S("system");
    }, [
        c,
        e
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let o = window.matchMedia(I);
        return o.addListener(A), A(o), ()=>o.removeListener(A);
    }, [
        A
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let o = (r)=>{
            r.key === m && (r.newValue ? n(r.newValue) : f(l));
        };
        return window.addEventListener("storage", o), ()=>window.removeEventListener("storage", o);
    }, [
        f
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        S(e != null ? e : c);
    }, [
        e,
        c
    ]);
    let Q = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            theme: c,
            setTheme: f,
            forcedTheme: e,
            resolvedTheme: c === "system" ? T : c,
            themes: s ? [
                ...a,
                "system"
            ] : a,
            systemTheme: s ? T : void 0
        }), [
        c,
        f,
        e,
        T,
        s,
        a
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](x.Provider, {
        value: Q
    }, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](_, {
        forcedTheme: e,
        storageKey: m,
        attribute: h,
        enableSystem: s,
        enableColorScheme: u,
        defaultTheme: l,
        value: d,
        themes: a,
        nonce: p,
        scriptProps: R
    }), w);
}, _ = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w })=>{
    let p = JSON.stringify([
        s,
        i,
        a,
        e,
        h,
        l,
        u,
        m
    ]).slice(1, -1);
    return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Salve$2f$Salve$2d$front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("script", {
        ...w,
        suppressHydrationWarning: !0,
        nonce: ("TURBOPACK compile-time truthy", 1) ? d : "TURBOPACK unreachable",
        dangerouslySetInnerHTML: {
            __html: `(${M.toString()})(${p})`
        }
    });
}), H = (e, i)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    let s;
}, W = (e)=>{
    let i = document.createElement("style");
    return e && i.setAttribute("nonce", e), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), ()=>{
        window.getComputedStyle(document.body), setTimeout(()=>{
            document.head.removeChild(i);
        }, 1);
    };
}, E = (e)=>(e || (e = window.matchMedia(I)), e.matches ? "dark" : "light");
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fedc3286._.js.map