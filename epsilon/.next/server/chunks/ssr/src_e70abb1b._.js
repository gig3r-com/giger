module.exports = {

"[project]/src/app/(app)/creator/users/_components/UserForm/schema.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/users/_components/schema.ts
__turbopack_context__.s({
    "userSchema": ()=>userSchema
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yup/index.esm.js [app-ssr] (ecmascript)");
;
const str = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().defined();
const num = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"]().defined();
const bool = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().defined();
const strArr = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().defined()).defined();
const userSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
    id: str().required(),
    active: bool().required(),
    roles: strArr().required(),
    handle: str().required(),
    name: str().required(),
    surname: str().required(),
    species: str().required(),
    cyberwareLevel: num().min(0).required(),
    faction: str(),
    factionRankPublic: str(),
    factionRankActual: str(),
    speciesPrivate: str(),
    hardRecords: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixed"]()).defined(),
    favoriteUsers: strArr(),
    offGameRecords: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixed"]()).defined(),
    combatSkill: num().min(0),
    // Keep the canonical key only:
    hackingSkill: num().min(0),
    confrontationistVsAgreeable: num(),
    cowardVsBrave: num(),
    talkativeVsSilent: num(),
    thinkerVsDoer: num(),
    vibe: str(),
    mindRecords: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixed"]()).defined(),
    affiliation: str(),
    profession: str(),
    wealth: str(),
    accounts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixed"]()).defined(),
    mainAccount: str(),
    conversations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixed"]()).defined(),
    network: str(),
    networkAdmin: str(),
    subnetwork: str(),
    gigReputation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]().defined(),
    personalIce: num().min(0),
    hackerName: str(),
    exploits: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"]().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mixed"]()).defined()
}).noUnknown(true);
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "FormDebug": ()=>FormDebug
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$tree$2d$view$2f$esm$2f$SimpleTreeView$2f$SimpleTreeView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-tree-view/esm/SimpleTreeView/SimpleTreeView.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$tree$2d$view$2f$esm$2f$TreeItem$2f$TreeItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-tree-view/esm/TreeItem/TreeItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ExpandMore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChevronRight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ChevronRight.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const StyledTreeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$tree$2d$view$2f$esm$2f$TreeItem$2f$TreeItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TreeItem"])(({ theme })=>({
        "& .MuiTreeItem-label": {
            fontSize: 12,
            fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace"
        }
    }));
const renderTree = (value, label, path)=>{
    const isObject = value !== null && typeof value === "object" && !Array.isArray(value);
    const isArray = Array.isArray(value);
    if (isObject || isArray) {
        const entries = isArray ? value.map((v, i)=>[
                String(i),
                v
            ]) : Object.entries(value);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StyledTreeItem, {
            itemId: path,
            label: label,
            children: entries.map(([k, v])=>renderTree(v, k, path ? `${path}.${k}` : k))
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    let display;
    if (typeof value === "string") display = `"${value}"`;
    else if (value === null) display = "null";
    else if (typeof value === "undefined") display = "undefined";
    else display = String(value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StyledTreeItem, {
        itemId: path,
        label: label ? `${label}: ${display}` : display
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx",
        lineNumber: 53,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const FormDebug = ()=>{
    const { values, errors, touched } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormikContext"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        variant: "outlined",
        sx: {
            mt: 2,
            p: 1.5,
            bgcolor: "#000000",
            color: "#ffffff",
            borderRadius: 2,
            fontSize: 12,
            overflow: "auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                sx: {
                    mb: 1,
                    display: "block",
                    opacity: 0.8
                },
                children: "Formik debug"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    pl: 0.5
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$tree$2d$view$2f$esm$2f$SimpleTreeView$2f$SimpleTreeView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SimpleTreeView"], {
                    "aria-label": "Formik debug tree",
                    slots: {
                        expandIcon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChevronRight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                        collapseIcon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ExpandMore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                    },
                    sx: {
                        flexGrow: 1,
                        overflowY: "auto"
                    },
                    children: [
                        renderTree(values, "values", "values"),
                        renderTree(errors, "errors", "errors"),
                        renderTree(touched, "touched", "touched")
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx",
        lineNumber: 64,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/common/Tabs.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tab/Tab.js [app-ssr] (ecmascript) <export default as Tab>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tabs/Tabs.js [app-ssr] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
;
;
;
/** Make a safe DOM id from arbitrary keys */ const idFromKey = (k)=>`tabsui-${k.toLowerCase().replace(/[^a-z0-9_-]+/gi, "-")}`;
const a11yProps = (k)=>{
    const id = idFromKey(k);
    return {
        id: `${id}-tab`,
        "aria-controls": `${id}-panel`
    };
};
const TabPanel = ({ children, value, tabKey })=>{
    const hidden = value !== tabKey;
    const baseId = idFromKey(tabKey);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "tabpanel",
        hidden: hidden,
        id: `${baseId}-panel`,
        "aria-labelledby": `${baseId}-tab`,
        style: {
            maxWidth: "100%"
        },
        children: !hidden && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                p: 0,
                maxWidth: "100%"
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/common/Tabs.tsx",
            lineNumber: 47,
            columnNumber: 19
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/common/Tabs.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const TabsUI = ({ value, onChange, tabs, preventSelectDisabled = true })=>{
    // Fast lookup by key
    const tabMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const m = new Map();
        tabs.forEach((t)=>m.set(t.key, t));
        return m;
    }, [
        tabs
    ]);
    const firstEnabledKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>tabs.find((t)=>!t.disabled)?.key ?? tabs[0]?.key ?? "", [
        tabs
    ]);
    // If the controlled `value` doesn't exist anymore (e.g., tabs changed),
    // fall back to the first enabled tab to keep UI consistent.
    const effectiveValue = (value && tabMap.has(value) ? value : firstEnabledKey) ?? "";
    const handleChange = (event, newKey)=>{
        if (preventSelectDisabled && tabMap.get(newKey)?.disabled) return;
        onChange(event, newKey);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                sx: {
                    px: 1,
                    pt: 0.5,
                    width: "100%"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                    value: effectiveValue,
                    onChange: handleChange,
                    variant: "scrollable",
                    scrollButtons: "auto",
                    allowScrollButtonsMobile: true,
                    TabIndicatorProps: {
                        sx: {
                            height: 3,
                            borderRadius: 1,
                            backgroundColor: "primary.main"
                        }
                    },
                    sx: {
                        minWidth: 0,
                        height: 36,
                        "& .MuiTabs-scrollButtons": {
                            width: 36,
                            flexShrink: 0
                        },
                        "& .MuiTabs-scrollButtons.Mui-disabled": {
                            opacity: 0.35
                        },
                        "& .MuiTabs-flexContainer": {
                            gap: 0.5
                        },
                        "& .MuiTab-root": {
                            minHeight: 50,
                            minWidth: 0,
                            px: 1.25,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            maxWidth: 240
                        }
                    },
                    children: tabs.map((t)=>{
                        const tabEl = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                            value: t.key,
                            label: t.label,
                            disabled: t.disabled,
                            ...a11yProps(t.key)
                        }, t.key, false, {
                            fileName: "[project]/src/components/common/Tabs.tsx",
                            lineNumber: 120,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                        return t.disabled && t.disabledReason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: t.disabledReason,
                            arrow: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: tabEl
                            }, void 0, false, {
                                fileName: "[project]/src/components/common/Tabs.tsx",
                                lineNumber: 130,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, t.key, false, {
                            fileName: "[project]/src/components/common/Tabs.tsx",
                            lineNumber: 129,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : tabEl;
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/common/Tabs.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/common/Tabs.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            tabs.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TabPanel, {
                    value: effectiveValue,
                    tabKey: t.key,
                    children: t.component
                }, t.key, false, {
                    fileName: "[project]/src/components/common/Tabs.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = TabsUI;
}),
"[project]/src/configs/BaseSelectFields.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BOOL": ()=>BOOL
});
const BOOL = [
    {
        value: 'true',
        label: 'True'
    },
    {
        value: 'false',
        label: 'False'
    }
];
}),
"[project]/src/mockData/networks.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "networks": ()=>networks
});
const networks = [
    {
        "id": "net-ec",
        "name": "Echelon Grid",
        "admin": "clockwork",
        "subnetworks": [
            "Core",
            "Ops",
            "R&D",
            "Audit"
        ],
        "nodes": {
            "hq": "Echelon Tower",
            "backup": "ColdStore-7"
        },
        "data": {
            "motto": "Precision above all",
            "sector": "Finance"
        }
    },
    {
        "id": "net-ns",
        "name": "Neon Spine",
        "admin": "synthia",
        "subnetworks": [
            "Spine-Core",
            "SynthHub",
            "NightMarket"
        ],
        "nodes": {
            "arcology": "Helix-18",
            "uplink": "Spire-North"
        },
        "data": {
            "motto": "We automate desire",
            "sector": "BioTech"
        }
    },
    {
        "id": "net-bib",
        "name": "Black Ice Bazaar",
        "admin": "neonViper",
        "subnetworks": [
            "Mainframe",
            "SmugglerNet",
            "BountyBoard"
        ],
        "nodes": {
            "datavault": "Obsidian-1",
            "exchange": "DarkLine"
        },
        "data": {
            "motto": "Everything has a price",
            "sector": "Shadow Market"
        }
    }
];
}),
"[project]/src/mockData/subnetworks.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "subnetworks": ()=>subnetworks
});
const subnetworks = [
    {
        "id": "sub-ec-1",
        "name": "Core",
        "network": "Echelon Grid",
        "users": [
            "avalon",
            "silkRoad",
            "zeroDay"
        ],
        "firewall": "Aegis-IX",
        "operationSystem": "OmniKernel 7",
        "ice": [
            "Black ICE v3",
            "RiotGlass"
        ],
        "accessPoint": "Public kiosk : Sector-5",
        "pastHacks": [
            "ZeroNight",
            "Orchid Fall"
        ],
        "logs": [
            {
                "id": "log-net-ec-1-1",
                "timestamp": "2025-11-01T00:00:00",
                "sourceUser": "avalon",
                "targetUser": "avalon",
                "logType": "ICE_TRIP",
                "logData": "token expired",
                "subnetwork": "Core"
            }
        ]
    },
    {
        "id": "sub-ec-2",
        "name": "Ops",
        "network": "Echelon Grid",
        "users": [
            "ironBard",
            "zeroDay",
            "redLotus"
        ],
        "firewall": "Aegis-IX",
        "operationSystem": "GhostShell 12",
        "ice": [
            "RiotGlass",
            "Medusa"
        ],
        "accessPoint": "Rooftop relay",
        "pastHacks": [
            "Cascade Break",
            "Glass Spire"
        ],
        "logs": [
            {
                "id": "log-net-ec-2-1",
                "timestamp": "2025-11-02T00:00:00",
                "sourceUser": "zeroDay",
                "targetUser": "zeroDay",
                "logType": "ICE_TRIP",
                "logData": "port sweep",
                "subnetwork": "Ops"
            }
        ]
    },
    {
        "id": "sub-ec-3",
        "name": "R&D",
        "network": "Echelon Grid",
        "users": [
            "ghostcat",
            "blueComet",
            "redLotus",
            "avalon",
            "neonViper"
        ],
        "firewall": "Cerberus Gate",
        "operationSystem": "SomaOS 3",
        "ice": [
            "Black ICE v3",
            "NeedleStorm"
        ],
        "accessPoint": "Rooftop relay",
        "pastHacks": [
            "Glass Spire",
            "ZeroNight"
        ],
        "logs": [
            {
                "id": "log-net-ec-3-1",
                "timestamp": "2025-11-03T00:00:00",
                "sourceUser": "neonViper",
                "targetUser": "redLotus",
                "logType": "AUTH_FAIL",
                "logData": "token expired",
                "subnetwork": "R&D"
            }
        ]
    },
    {
        "id": "sub-ec-4",
        "name": "Audit",
        "network": "Echelon Grid",
        "users": [
            "ghostcat",
            "avalon",
            "zeroDay",
            "redLotus"
        ],
        "firewall": "Cerberus Gate",
        "operationSystem": "NixOS-Grid",
        "ice": [
            "Whiteout",
            "Black ICE v3"
        ],
        "accessPoint": "Public kiosk : Sector-5",
        "pastHacks": [
            "Blue Dawn",
            "Glass Spire"
        ],
        "logs": [
            {
                "id": "log-net-ec-4-1",
                "timestamp": "2025-11-04T00:00:00",
                "sourceUser": "zeroDay",
                "targetUser": "avalon",
                "logType": "AUTH_FAIL",
                "logData": "signature mismatch",
                "subnetwork": "Audit"
            }
        ]
    },
    {
        "id": "sub-ns-1",
        "name": "Spine-Core",
        "network": "Neon Spine",
        "users": [
            "silkRoad",
            "ghostcat",
            "neonViper",
            "blueComet",
            "ironBard"
        ],
        "firewall": "Aegis-IX",
        "operationSystem": "OmniKernel 7",
        "ice": [
            "NeedleStorm",
            "RiotGlass"
        ],
        "accessPoint": "Service mesh : Gate-Ω",
        "pastHacks": [
            "Orchid Fall",
            "Cascade Break"
        ],
        "logs": [
            {
                "id": "log-net-ns-1-1",
                "timestamp": "2025-11-01T00:00:00",
                "sourceUser": "neonViper",
                "targetUser": "silkRoad",
                "logType": "ICE_TRIP",
                "logData": "port sweep",
                "subnetwork": "Spine-Core"
            }
        ]
    },
    {
        "id": "sub-ns-2",
        "name": "SynthHub",
        "network": "Neon Spine",
        "users": [
            "redLotus",
            "silkRoad",
            "ghostcat",
            "synthia",
            "ironBard"
        ],
        "firewall": "Cerberus Gate",
        "operationSystem": "OmniKernel 7",
        "ice": [
            "NeedleStorm",
            "RiotGlass"
        ],
        "accessPoint": "Public kiosk : Sector-5",
        "pastHacks": [
            "Cascade Break",
            "Blue Dawn"
        ],
        "logs": [
            {
                "id": "log-net-ns-2-1",
                "timestamp": "2025-11-02T00:00:00",
                "sourceUser": "silkRoad",
                "targetUser": "silkRoad",
                "logType": "AUTH_FAIL",
                "logData": "token expired",
                "subnetwork": "SynthHub"
            }
        ]
    },
    {
        "id": "sub-ns-3",
        "name": "NightMarket",
        "network": "Neon Spine",
        "users": [
            "blueComet",
            "redLotus",
            "clockwork",
            "ghostcat",
            "ironBard",
            "silkRoad",
            "synthia"
        ],
        "firewall": "Wolfhound",
        "operationSystem": "NixOS-Grid",
        "ice": [
            "Black ICE v3",
            "RiotGlass"
        ],
        "accessPoint": "Maintenance shaft 12B",
        "pastHacks": [
            "Cascade Break",
            "Glass Spire"
        ],
        "logs": [
            {
                "id": "log-net-ns-3-1",
                "timestamp": "2025-11-03T00:00:00",
                "sourceUser": "ironBard",
                "targetUser": "blueComet",
                "logType": "PING",
                "logData": "signature mismatch",
                "subnetwork": "NightMarket"
            }
        ]
    },
    {
        "id": "sub-bib-1",
        "name": "Mainframe",
        "network": "Black Ice Bazaar",
        "users": [
            "ironBard",
            "silkRoad",
            "avalon",
            "clockwork",
            "redLotus",
            "synthia"
        ],
        "firewall": "Cerberus Gate",
        "operationSystem": "SomaOS 3",
        "ice": [
            "Black ICE v3",
            "Medusa"
        ],
        "accessPoint": "Public kiosk : Sector-5",
        "pastHacks": [
            "Cascade Break",
            "Glass Spire"
        ],
        "logs": [
            {
                "id": "log-net-bib-1-1",
                "timestamp": "2025-11-01T00:00:00",
                "sourceUser": "ironBard",
                "targetUser": "synthia",
                "logType": "AUTH_FAIL",
                "logData": "token expired",
                "subnetwork": "Mainframe"
            }
        ]
    },
    {
        "id": "sub-bib-2",
        "name": "SmugglerNet",
        "network": "Black Ice Bazaar",
        "users": [
            "ironBard",
            "ghostcat",
            "silkRoad",
            "redLotus"
        ],
        "firewall": "Aegis-IX",
        "operationSystem": "OmniKernel 7",
        "ice": [
            "Medusa",
            "Whiteout"
        ],
        "accessPoint": "Rooftop relay",
        "pastHacks": [
            "Orchid Fall",
            "Blue Dawn"
        ],
        "logs": [
            {
                "id": "log-net-bib-2-1",
                "timestamp": "2025-11-02T00:00:00",
                "sourceUser": "redLotus",
                "targetUser": "ironBard",
                "logType": "SCAN",
                "logData": "signature mismatch",
                "subnetwork": "SmugglerNet"
            }
        ]
    },
    {
        "id": "sub-bib-3",
        "name": "BountyBoard",
        "network": "Black Ice Bazaar",
        "users": [
            "zeroDay",
            "avalon",
            "blueComet",
            "silkRoad",
            "ironBard"
        ],
        "firewall": "SableWall v5",
        "operationSystem": "GhostShell 12",
        "ice": [
            "Black ICE v3",
            "Whiteout"
        ],
        "accessPoint": "Maintenance shaft 12B",
        "pastHacks": [
            "Glass Spire",
            "Cascade Break"
        ],
        "logs": [
            {
                "id": "log-net-bib-3-1",
                "timestamp": "2025-11-03T00:00:00",
                "sourceUser": "blueComet",
                "targetUser": "ironBard",
                "logType": "PING",
                "logData": "port sweep",
                "subnetwork": "BountyBoard"
            }
        ]
    }
];
}),
"[project]/src/configs/UserSelectFields.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CHAR_STAT": ()=>CHAR_STAT,
    "COMBAT_STAT": ()=>COMBAT_STAT,
    "HACKER_STAT": ()=>HACKER_STAT,
    "HARD_RECORDS_ASSET_SUBCATEGORIES": ()=>HARD_RECORDS_ASSET_SUBCATEGORIES,
    "HARD_RECORDS_CATEGORIES": ()=>HARD_RECORDS_CATEGORIES,
    "HARD_RECORDS_CRIMINAL_SUBCATEGORIES": ()=>HARD_RECORDS_CRIMINAL_SUBCATEGORIES,
    "HARD_RECORDS_FILE_SUBCATEGORIES": ()=>HARD_RECORDS_FILE_SUBCATEGORIES,
    "HARD_RECORDS_MEDICAL_SUBCATEGORIES": ()=>HARD_RECORDS_MEDICAL_SUBCATEGORIES,
    "MIND_RECORDS_CATEGORIES": ()=>MIND_RECORDS_CATEGORIES,
    "MIND_RECORDS_GOAL_SUBCATEGORIES": ()=>MIND_RECORDS_GOAL_SUBCATEGORIES,
    "MIND_RECORDS_MEMORY_SUBCATEGORIES": ()=>MIND_RECORDS_MEMORY_SUBCATEGORIES,
    "MIND_RECORDS_RELATION_SUBCATEGORIES": ()=>MIND_RECORDS_RELATION_SUBCATEGORIES,
    "NETWORKS": ()=>NETWORKS,
    "OFFGAME_RECORDS_CATEGORIES": ()=>OFFGAME_RECORDS_CATEGORIES,
    "OFFGAME_RECORDS_GOAL_SUBCATEGORIES": ()=>OFFGAME_RECORDS_GOAL_SUBCATEGORIES,
    "OFFGAME_RECORDS_META_SUBCATEGORIES": ()=>OFFGAME_RECORDS_META_SUBCATEGORIES,
    "PERSONAL_ICE": ()=>PERSONAL_ICE,
    "ROLES": ()=>ROLES,
    "SPECIES": ()=>SPECIES,
    "SUBNETWORKS": ()=>SUBNETWORKS,
    "WEALTH_LEVELS": ()=>WEALTH_LEVELS
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$networks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/networks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$subnetworks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/subnetworks.ts [app-ssr] (ecmascript)");
;
;
const SPECIES = [
    {
        value: 'human',
        label: 'Human'
    },
    {
        value: 'android',
        label: 'Android'
    },
    {
        value: 'ai',
        label: 'AI'
    }
];
const CHAR_STAT = [
    {
        value: '0',
        label: '0 (----)'
    },
    {
        value: '1',
        label: '1 (#---)'
    },
    {
        value: '2',
        label: '2 (##--)'
    },
    {
        value: '3',
        label: '3 (###-)'
    },
    {
        value: '4',
        label: '4 (####)'
    }
];
const COMBAT_STAT = [
    {
        value: '0',
        label: '0'
    },
    {
        value: '1',
        label: '1'
    },
    {
        value: '2',
        label: '2'
    },
    {
        value: '3',
        label: '3'
    }
];
const HACKER_STAT = [
    {
        value: '0',
        label: '0'
    },
    {
        value: '1',
        label: '1'
    },
    {
        value: '2',
        label: '2'
    },
    {
        value: '3',
        label: '3'
    }
];
const PERSONAL_ICE = [
    {
        value: '0',
        label: '0'
    },
    {
        value: '1',
        label: '1'
    },
    {
        value: '2',
        label: '2'
    },
    {
        value: '3',
        label: '3'
    }
];
const NETWORKS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$networks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networks"].map((net)=>({
        value: net.name,
        label: net.name
    }));
const SUBNETWORKS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$subnetworks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subnetworks"].map((sunbnet)=>({
        value: sunbnet.name,
        label: sunbnet.name
    }));
const ROLES = [
    {
        value: 'ADMIN',
        label: 'Admin'
    },
    {
        value: 'NPC',
        label: 'NPC'
    },
    {
        value: 'MODERATOR',
        label: 'Moderator'
    },
    {
        value: 'INFLUENCER',
        label: 'Influencer'
    },
    {
        value: 'GOD',
        label: 'GOD'
    },
    {
        value: 'BOSS',
        label: 'Boss'
    },
    {
        value: 'PLAYER',
        label: 'Player'
    }
];
const WEALTH_LEVELS = [
    {
        value: 'BROKE',
        label: '1 - Broke'
    },
    {
        value: 'IMPOVERISHED',
        label: '2 - Impoverished'
    },
    {
        value: 'STRUGGLING',
        label: '3 - Struggling'
    },
    {
        value: 'MODEST',
        label: '4 - Modest'
    },
    {
        value: 'STABLE',
        label: '5 - Stable'
    },
    {
        value: 'COMFORTABLE',
        label: '6 - Comfortable'
    },
    {
        value: 'AFFLUENT',
        label: '7 - Affluent'
    },
    {
        value: 'ELITE',
        label: '8 - Elite'
    }
];
const HARD_RECORDS_CATEGORIES = [
    {
        value: 'CRIMINAL',
        label: 'Criminal'
    },
    {
        value: 'MEDICAL',
        label: 'Medical'
    },
    {
        value: 'FILE',
        label: 'Files'
    },
    {
        value: 'ASSET',
        label: 'Assets'
    }
];
const MIND_RECORDS_CATEGORIES = [
    {
        value: 'RELATION',
        label: 'Relation'
    },
    {
        value: 'GOAL',
        label: 'Goal'
    },
    {
        value: 'MEMORY',
        label: 'Memory'
    }
];
const OFFGAME_RECORDS_CATEGORIES = [
    {
        value: 'META',
        label: 'Relation'
    },
    {
        value: 'GOAL',
        label: 'Goal'
    }
];
const HARD_RECORDS_CRIMINAL_SUBCATEGORIES = [
    {
        value: 'VICTIM',
        label: 'Victim'
    },
    {
        value: 'SUSPECT',
        label: 'Suspect'
    },
    {
        value: 'WANTED',
        label: 'Wanted'
    },
    {
        value: 'WITNESS',
        label: 'Witness'
    },
    {
        value: 'PUNISHMENT',
        label: 'Punishment'
    }
];
const HARD_RECORDS_MEDICAL_SUBCATEGORIES = [
    {
        value: 'CYBERWARE',
        label: 'Cyberware'
    },
    {
        value: 'MEDICAL_DRUG',
        label: 'Medical Drug'
    },
    {
        value: 'MEDICAL_PROCEDURE',
        label: 'Medical Procedure'
    },
    {
        value: 'SYMPTOM',
        label: 'Symptom'
    }
];
const HARD_RECORDS_FILE_SUBCATEGORIES = [
    {
        value: 'PRIVATE_RECORD',
        label: 'Private Record'
    }
];
const HARD_RECORDS_ASSET_SUBCATEGORIES = [
    {
        value: 'STOCKS',
        label: 'Stocks'
    }
];
const MIND_RECORDS_RELATION_SUBCATEGORIES = [
    {
        value: 'FRIEND',
        label: 'Friend'
    },
    {
        value: 'ENEMY',
        label: 'Enemy'
    }
];
const MIND_RECORDS_GOAL_SUBCATEGORIES = [
    {
        value: 'FACTION',
        label: 'Faction'
    }
];
const MIND_RECORDS_MEMORY_SUBCATEGORIES = [
    {
        value: 'TRAUMA',
        label: 'Trauma'
    }
];
const OFFGAME_RECORDS_META_SUBCATEGORIES = [
    {
        value: 'INFORMATIONS',
        label: 'Informations'
    }
];
const OFFGAME_RECORDS_GOAL_SUBCATEGORIES = [
    {
        value: 'FACTION',
        label: 'Faction'
    }
];
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/labels.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
const labels = {
    handle: 'Handle',
    active: 'Active',
    name: 'Name',
    surname: 'Surname',
    roles: 'Roles',
    faction: 'Faction',
    factionRankPublic: 'Rank public',
    factionRankActual: 'Rank actual',
    speciesPublic: 'Species public',
    speciesActual: 'Species actual',
    vibe: 'vibe',
    vibeLevel: 'vibeLevel',
    favoriteUsers: 'favoriteUsers',
    confrontationistVsAgreeable: 'Confrontationist ↔ Agreeable',
    cowardVsBrave: 'Coward ↔ Brave',
    talkativeVsSilent: 'Talkative ↔ Silent',
    thinkerVsDoer: 'Thinker ↔ Doer',
    affiliation: 'affiliation',
    profession: 'profession',
    wealth: 'Wealth level',
    cyberwareLevel: 'cyberwareLevel',
    network: 'Network',
    subnetwork: 'Subnetwork',
    combatSkill: 'Combat skill',
    hackerSkill: 'Hacker skill',
    hackerName: 'Hacker name',
    personalIce: 'personalIce',
    exploits: 'Exploits',
    /*
     * *******************
     * Banking
     * *******************
     */ /*
     * *******************
     * Epsilon
     * *******************
     */ chatNotesTitle: 'CONVERSATIONS NOTES',
    chatNotesDescription: 'How a character speaks, writes, common sayings.',
    epsilonConversationNotes: 'Conversations notes',
    epsilonConversationNotesPlaceholder: `How this character speaks/writes?\nSayings: "...", "...", "..."`,
    plotNotesTitle: 'PLOT NOTES',
    plotNotesDescription: `Character's plots, hooks, etc.`,
    epsilonPlots: `Character's plots`,
    epsilonPlotsPlaceholder: `* Plot#1\n* Plot#2`,
    epsilonConversationsNotes: ''
};
const __TURBOPACK__default__export__ = labels;
}),
"[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
;
;
;
;
/**
 * Simple MUI TextField bound to Formik.
 * Works with MUI v5 and Formik v2.
 */ const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FormikTextField({ name, ...props }, ref) {
    const [field, meta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])(name);
    const isError = Boolean(meta.touched && meta.error);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ...field,
        fullWidth: true,
        size: "small",
        ...props,
        inputRef: ref,
        id: props.id ?? name,
        error: isError,
        helperText: isError ? meta.error ?? ` ` : props.helperText ?? ` `,
        value: field.value ?? ''
    }, void 0, false, {
        fileName: "[project]/src/components/forms/Input.tsx",
        lineNumber: 22,
        columnNumber: 13
    }, this);
});
const __TURBOPACK__default__export__ = Input;
}),
"[project]/src/components/forms/Select.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
;
;
;
;
;
const Select = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function FormikSelect({ name, options, ...props }, ref) {
    const [field, meta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])(name);
    const isError = Boolean(meta.touched && meta.error);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        select: true,
        fullWidth: true,
        size: "small",
        ...field,
        ...props,
        inputRef: ref,
        id: props.id ?? name,
        error: isError,
        helperText: isError ? meta.error ?? ` ` : props.helperText ?? ` `,
        value: field.value ?? '',
        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                value: option.value,
                children: option.label
            }, option.value, false, {
                fileName: "[project]/src/components/forms/Select.tsx",
                lineNumber: 38,
                columnNumber: 21
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/forms/Select.tsx",
        lineNumber: 25,
        columnNumber: 13
    }, this);
});
const __TURBOPACK__default__export__ = Select;
}),
"[project]/src/components/forms/ArrayInput.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const ArrayInput = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ArrayInput({ name, helperText, InputProps, ...props }, ref) {
    const [field, meta, helpers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])(name);
    const [input, setInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const isError = Boolean(meta.touched && meta.error);
    const values = Array.isArray(field.value) ? field.value : [];
    const addValue = ()=>{
        const trimmed = input.trim();
        if (!trimmed) return;
        helpers.setValue([
            ...values,
            trimmed
        ]);
        setInput('');
        helpers.setTouched(true, false);
    };
    const removeValue = (index)=>{
        const next = values.filter((_, i)=>i !== index);
        helpers.setValue(next);
        helpers.setTouched(true, false);
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            addValue();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                fullWidth: true,
                size: "small",
                ...props,
                name: name,
                id: props.id ?? name,
                inputRef: ref,
                value: input,
                onChange: (e)=>setInput(e.target.value),
                onKeyDown: handleKeyDown,
                onBlur: ()=>helpers.setTouched(true),
                error: isError,
                helperText: isError ? meta.error : helperText,
                InputProps: {
                    ...InputProps,
                    endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        position: "end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: "small",
                            onClick: addValue,
                            edge: "end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                fontSize: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forms/ArrayInput.tsx",
                                lineNumber: 67,
                                columnNumber: 37
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/forms/ArrayInput.tsx",
                            lineNumber: 66,
                            columnNumber: 33
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/forms/ArrayInput.tsx",
                        lineNumber: 65,
                        columnNumber: 29
                    }, void 0)
                }
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArrayInput.tsx",
                lineNumber: 49,
                columnNumber: 17
            }, this),
            values.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                mt: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                children: values.map((value, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: value,
                        size: "small",
                        onDelete: ()=>removeValue(index)
                    }, `${value}-${index}`, false, {
                        fileName: "[project]/src/components/forms/ArrayInput.tsx",
                        lineNumber: 77,
                        columnNumber: 29
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArrayInput.tsx",
                lineNumber: 75,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forms/ArrayInput.tsx",
        lineNumber: 48,
        columnNumber: 13
    }, this);
});
const __TURBOPACK__default__export__ = ArrayInput;
}),
"[project]/src/components/forms/ArraySelect.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const ArraySelect = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function ArraySelect({ name, options, helperText, allowDuplicates = false, InputProps, SelectProps, ...props }, ref) {
    const [field, meta, helpers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])(name);
    const [selected, setSelected] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('');
    const isError = Boolean(meta.touched && meta.error);
    const values = Array.isArray(field.value) ? field.value : [];
    const addValue = ()=>{
        if (!selected) return;
        if (!allowDuplicates && values.includes(selected)) return;
        helpers.setValue([
            ...values,
            selected
        ]);
        setSelected('');
        helpers.setTouched(true, false);
    };
    const removeValue = (index)=>{
        const next = values.filter((_, i)=>i !== index);
        helpers.setValue(next);
        helpers.setTouched(true, false);
    };
    const handleSelectChange = (e)=>{
        setSelected(e.target.value);
    };
    const mergedSelectSx = {
        '& .MuiSelect-select.MuiSelect-outlined': {
            pl: 0.5
        },
        ...SelectProps?.sx || {}
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                select: true,
                fullWidth: true,
                size: "small",
                ...props,
                id: props.id ?? name,
                inputRef: ref,
                value: selected,
                onChange: handleSelectChange,
                onBlur: ()=>helpers.setTouched(true),
                error: isError,
                helperText: isError ? meta.error : helperText,
                InputProps: {
                    ...InputProps,
                    startAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        position: "start",
                        sx: {
                            ml: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: "small",
                            onClick: addValue,
                            edge: "start",
                            disabled: !selected,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                fontSize: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/components/forms/ArraySelect.tsx",
                                lineNumber: 86,
                                columnNumber: 37
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/forms/ArraySelect.tsx",
                            lineNumber: 80,
                            columnNumber: 33
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/forms/ArraySelect.tsx",
                        lineNumber: 79,
                        columnNumber: 29
                    }, void 0)
                },
                SelectProps: {
                    ...SelectProps,
                    sx: mergedSelectSx
                },
                children: options.map((option)=>{
                    const disabled = !allowDuplicates && values.includes(option.value);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        value: option.value,
                        disabled: disabled,
                        children: option.label
                    }, option.value, false, {
                        fileName: "[project]/src/components/forms/ArraySelect.tsx",
                        lineNumber: 101,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArraySelect.tsx",
                lineNumber: 64,
                columnNumber: 17
            }, this),
            values.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                mt: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                children: values.map((value, index)=>{
                    const option = options.find((o)=>o.value === value);
                    const label = option?.label ?? value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: label,
                        size: "small",
                        onDelete: ()=>removeValue(index)
                    }, `${value}-${index}`, false, {
                        fileName: "[project]/src/components/forms/ArraySelect.tsx",
                        lineNumber: 119,
                        columnNumber: 33
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArraySelect.tsx",
                lineNumber: 113,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forms/ArraySelect.tsx",
        lineNumber: 63,
        columnNumber: 13
    }, this);
});
const __TURBOPACK__default__export__ = ArraySelect;
}),
"[project]/src/components/forms/Section.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
;
;
function Section({ title, direction, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
        sx: {
            flex: 1,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            boxSizing: 'border-box'
        },
        children: [
            title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                variant: "h6",
                className: "glitch",
                "data-glitch": title,
                sx: {
                    letterSpacing: 1.5,
                    mb: 1
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/forms/Section.tsx",
                lineNumber: 7,
                columnNumber: 23
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                direction: direction,
                gap: 2,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/forms/Section.tsx",
                lineNumber: 10,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forms/Section.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = Section;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$BaseSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/BaseSelectFields.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/UserSelectFields.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/labels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArrayInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/ArrayInput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArraySelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/ArraySelect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
;
;
;
;
;
;
;
;
;
;
;
const Root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"])(({ theme })=>({
        padding: theme.spacing(2),
        gap: theme.spacing(2)
    }));
const Row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"])(({ theme })=>({
        flexDirection: 'row',
        gap: theme.spacing(2),
        alignItems: 'stretch',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    }));
const NotesRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"])(({ theme })=>({
        flexDirection: 'row',
        gap: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    }));
function MainTab() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Root, {
        direction: "column",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "IDENTITY",
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "handle",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].handle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 53,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "active",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].active,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$BaseSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOOL"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 54,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "name",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 57,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "surname",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].surname
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 58,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 56,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArraySelect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "roles",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].roles,
                                options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLES"]
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "PROFILE",
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "affiliation",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].affiliation
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "profession",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].profession
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "wealth",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wealth
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 67,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "cyberwareLevel",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cyberwareLevel
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "COMMUNITY",
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "vibe",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].vibe
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 74,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "vibeLevel",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].vibeLevel
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                flexItem: true,
                                sx: {
                                    my: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArrayInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "favoriteUsers",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].favoriteUsers
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 78,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                        lineNumber: 72,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "CHARACTER STATS",
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "combatSkill",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].combatSkill,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMBAT_STAT"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 85,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "hackerSkill",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hackerSkill,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HACKER_STAT"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 90,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                                flexItem: true,
                                sx: {
                                    my: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "confrontationistVsAgreeable",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].confrontationistVsAgreeable,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAR_STAT"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 98,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "cowardVsBrave",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].cowardVsBrave,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAR_STAT"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 103,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 97,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: {
                                    xs: 'column',
                                    md: 'row'
                                },
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "talkativeVsSilent",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].talkativeVsSilent,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAR_STAT"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 110,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "thinkerVsDoer",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].thinkerVsDoer,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHAR_STAT"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 115,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                        direction: "column",
                        gap: 2,
                        sx: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                title: "SPECIES",
                                direction: "column",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "speciesPublic",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].speciesPublic,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIES"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 125,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "speciesActual",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].speciesActual,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIES"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 130,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 124,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                title: "NETWORK",
                                direction: "column",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "network",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].network,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NETWORKS"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 138,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        name: "subnetwork",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].subnetwork,
                                        options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUBNETWORKS"]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                        lineNumber: 143,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 137,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        title: "FACTION",
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "faction",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].faction
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 152,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "factionRankPublic",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].factionRankPublic
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 153,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: "factionRankActual",
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].factionRankActual
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                                lineNumber: 157,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                        lineNumber: 151,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                title: "EPSILON NOTES",
                direction: "column",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotesRow, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            name: "epsilonNotes",
                            label: "Notes",
                            multiline: true,
                            minRows: 4,
                            sx: {
                                flex: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                            lineNumber: 166,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            name: "epsilonPlots",
                            label: "Plots",
                            multiline: true,
                            minRows: 4,
                            sx: {
                                flex: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                            lineNumber: 173,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                    lineNumber: 165,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
                lineNumber: 164,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = MainTab;
}),
"[project]/src/components/forms/ArrayObjectField.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ArrayObjectField": ()=>ArrayObjectField,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Delete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Restore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Restore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowUpward$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowUpward.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowDownward$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowDownward.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function ArrayObjectField({ name, label, createItem, renderItem, isItemRemovable, getItemKey }) {
    const [field, meta, helpers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useField"])(name);
    const values = Array.isArray(field.value) ? field.value : [];
    // Snapshot of initial items to detect "new" and "edited"
    const initialRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](Array.isArray(meta.initialValue) ? meta.initialValue : []);
    const keyFor = (item, index)=>getItemKey?.(item, index) ?? index;
    const [statusMap, setStatusMap] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>{
        const initial = initialRef.current;
        const map = {};
        values.forEach((item, index)=>{
            const key = keyFor(item, index);
            const isNew = index >= initial.length;
            map[key] = isNew ? 'new' : 'unchanged';
        });
        return map;
    });
    // Keep statusMap in sync when values change (e.g. edits, external changes)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const initial = initialRef.current;
        setStatusMap((prev)=>{
            const next = {};
            values.forEach((item, index)=>{
                const key = keyFor(item, index);
                const was = prev[key];
                // Preserve "removed" if already marked
                if (was === 'removed') {
                    next[key] = 'removed';
                    return;
                }
                const isNew = index >= initial.length;
                if (isNew) {
                    next[key] = 'new';
                    return;
                }
                const initialItem = initial[index];
                const isChanged = JSON.stringify(item) !== JSON.stringify(initialItem);
                if (isChanged) {
                    next[key] = was === 'new' ? 'new' : 'edited';
                } else {
                    next[key] = 'unchanged';
                }
            });
            return next;
        });
    }, [
        values
    ]);
    const setTouched = ()=>helpers.setTouched(true, false);
    const handleAdd = ()=>{
        const next = [
            ...values,
            createItem()
        ];
        helpers.setValue(next);
        setTouched();
    };
    const handleMove = (from, to)=>{
        if (to < 0 || to >= values.length) return;
        const copy = [
            ...values
        ];
        const [moved] = copy.splice(from, 1);
        copy.splice(to, 0, moved);
        helpers.setValue(copy);
        setTouched();
    };
    const toggleRemove = (index)=>{
        const item = values[index];
        const key = keyFor(item, index);
        setStatusMap((prev)=>{
            const current = prev[key];
            // If currently removed -> restore and recompute status
            if (current === 'removed') {
                const initial = initialRef.current;
                const isNew = index >= initial.length;
                if (isNew) {
                    return {
                        ...prev,
                        [key]: 'new'
                    };
                }
                const initialItem = initial[index];
                const isChanged = JSON.stringify(item) !== JSON.stringify(initialItem);
                return {
                    ...prev,
                    [key]: isChanged ? 'edited' : 'unchanged'
                };
            }
            // Mark as removed
            return {
                ...prev,
                [key]: 'removed'
            };
        });
        setTouched();
    };
    const bgForStatus = (status)=>{
        switch(status){
            case 'new':
                return 'rgba(76, 175, 80, 0.08)'; // light green
            case 'edited':
                return 'rgba(33, 150, 243, 0.08)'; // light blue
            case 'removed':
                return 'rgba(244, 67, 54, 0.08)'; // light red
            default:
                return 'background.paper';
        }
    };
    const borderForStatus = (status)=>{
        switch(status){
            case 'removed':
                return '1px dashed rgba(244, 67, 54, 0.6)';
            case 'new':
            case 'edited':
                return '1px solid rgba(0, 0, 0, 0.12)';
            default:
                return '1px solid rgba(0, 0, 0, 0.08)';
        }
    };
    const labelForStatus = (status)=>{
        switch(status){
            case 'new':
                return 'New – will be created on save';
            case 'edited':
                return 'Edited – changes will be saved';
            case 'removed':
                return 'Marked for deletion – will be removed on save';
            default:
                return '';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "subtitle1",
                sx: {
                    mb: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                lineNumber: 197,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                display: "flex",
                flexDirection: "column",
                gap: 1,
                children: values.map((item, index)=>{
                    const key = keyFor(item, index);
                    const status = statusMap[key] ?? 'unchanged';
                    const isRemoved = status === 'removed';
                    const removable = isItemRemovable ? isItemRemovable(item, index) : true;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        variant: "outlined",
                        sx: {
                            p: 1.5,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'flex-start',
                            opacity: isRemoved ? 0.7 : 1,
                            bgcolor: bgForStatus(status),
                            border: borderForStatus(status)
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                flexGrow: 1,
                                children: [
                                    renderItem({
                                        index,
                                        status
                                    }),
                                    status !== 'unchanged' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        variant: "caption",
                                        sx: {
                                            mt: 0.5,
                                            display: 'block',
                                            opacity: 0.8
                                        },
                                        children: labelForStatus(status)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                        lineNumber: 227,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                lineNumber: 224,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 0.5,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        title: "Move up",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                onClick: ()=>handleMove(index, index - 1),
                                                disabled: index === 0,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowUpward$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                lineNumber: 244,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                        lineNumber: 242,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        title: "Move down",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                onClick: ()=>handleMove(index, index + 1),
                                                disabled: index === values.length - 1,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowDownward$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                lineNumber: 256,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                            lineNumber: 255,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                        lineNumber: 254,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        title: isRemoved ? 'Restore item' : removable ? 'Mark for deletion' : 'Cannot be removed',
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                size: "small",
                                                onClick: ()=>toggleRemove(index),
                                                disabled: !removable,
                                                children: isRemoved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Restore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Delete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    fontSize: "small"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                                lineNumber: 276,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                            lineNumber: 275,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                        lineNumber: 266,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                                lineNumber: 236,
                                columnNumber: 29
                            }, this)
                        ]
                    }, key, true, {
                        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                        lineNumber: 211,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                lineNumber: 202,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                mt: 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    variant: "outlined",
                    size: "small",
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                        lineNumber: 299,
                        columnNumber: 32
                    }, void 0),
                    onClick: handleAdd,
                    children: "Add item"
                }, void 0, false, {
                    fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                    lineNumber: 296,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                lineNumber: 295,
                columnNumber: 13
            }, this),
            meta.touched && meta.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                color: "error",
                sx: {
                    mt: 0.5,
                    display: 'block'
                },
                children: String(meta.error)
            }, void 0, false, {
                fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
                lineNumber: 307,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forms/ArrayObjectField.tsx",
        lineNumber: 195,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = ArrayObjectField;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "makeRecordRenderItem": ()=>makeRecordRenderItem
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Select.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const typeOptions = [
    {
        value: 'TEXT',
        label: 'Text'
    },
    {
        value: 'FLAG',
        label: 'Flag'
    }
];
// Subcategories depend on category
const subCategoryOptionsByCategory = {
    system: [
        {
            value: 'config',
            label: 'Config'
        },
        {
            value: 'runtime',
            label: 'Runtime'
        }
    ],
    user: [
        {
            value: 'profile',
            label: 'Profile'
        },
        {
            value: 'preferences',
            label: 'Preferences'
        }
    ],
    security: [
        {
            value: 'auth',
            label: 'Auth'
        },
        {
            value: 'permissions',
            label: 'Permissions'
        }
    ]
};
const flagOptions = [
    {
        value: 'true',
        label: 'True'
    },
    {
        value: 'false',
        label: 'False'
    }
];
const statusToChip = (status)=>{
    switch(status){
        case 'new':
            return {
                label: 'New',
                color: 'success'
            };
        case 'edited':
            return {
                label: 'Edited',
                color: 'info'
            };
        case 'removed':
            return {
                label: 'Will be deleted',
                color: 'error'
            };
        default:
            return null;
    }
};
const RecordRow = ({ baseName, index, status, categories, subcategories })=>{
    const { values } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormikContext"])();
    const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIn"])(values, `${baseName}[${index}]`);
    const statusChip = statusToChip(status);
    const path = (field)=>`${baseName}[${index}].${field}`;
    const category = item?.category;
    const type = item?.type;
    const isFlag = type === 'FLAG';
    const subCategoryOptions = category && subcategories[category] || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                direction: "row",
                spacing: 1,
                alignItems: "flex-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: path('id'),
                        label: "ID",
                        fullWidth: true,
                        size: "small",
                        disabled: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: path('type'),
                        label: "Type",
                        fullWidth: true,
                        options: typeOptions
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    statusChip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: statusChip.label,
                        color: statusChip.color,
                        size: "small",
                        sx: {
                            alignSelf: 'center'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 105,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                direction: "row",
                spacing: 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: path('category'),
                        label: "Category",
                        options: categories
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: path('subCategory'),
                        label: "Sub-category",
                        options: subCategoryOptions
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                name: path('title'),
                label: "Title",
                fullWidth: true,
                size: "small"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isFlag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                name: path('data'),
                label: "Flag value",
                fullWidth: true,
                options: flagOptions
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 130,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                name: path('data'),
                label: "Data",
                fullWidth: true,
                size: "small",
                multiline: true,
                minRows: 3
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 137,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                direction: "row",
                spacing: 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: path('timestamp'),
                        label: "Timestamp",
                        type: "datetime-local",
                        size: "small",
                        fullWidth: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 149,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: path('hackData'),
                        label: "Hack data",
                        fullWidth: true,
                        size: "small"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 148,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            status !== 'unchanged' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "caption",
                sx: {
                    opacity: 0.7
                },
                children: [
                    status === 'new' && 'This record will be created when you save.',
                    status === 'edited' && 'Changes to this record will be saved.',
                    status === 'removed' && 'This record will be deleted when you save.'
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
                lineNumber: 166,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
        lineNumber: 85,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const makeRecordRenderItem = (baseName, categories, subcategories)=>({ index, status })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RecordRow, {
            baseName: baseName,
            index: index,
            status: status,
            categories: categories,
            subcategories: subcategories
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx",
            lineNumber: 184,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HardRecordsTab.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArrayObjectField$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/ArrayObjectField.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$makeRecordRenderItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/makeRecordRenderItem.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/UserSelectFields.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const createRecord = ()=>({
        id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `tmp-${Math.random().toString(36).slice(2, 9)}`,
        type: 'TEXT',
        category: undefined,
        subCategory: undefined,
        title: '',
        data: '',
        timestamp: '',
        hackData: ''
    });
function HardRecordsTab(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArrayObjectField$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        name: "hardRecords",
        label: "Records",
        createItem: createRecord,
        renderItem: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$makeRecordRenderItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeRecordRenderItem"])('hardRecords', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HARD_RECORDS_CATEGORIES"], {
            'ASSET': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HARD_RECORDS_ASSET_SUBCATEGORIES"],
            'CRIMINAL': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HARD_RECORDS_CRIMINAL_SUBCATEGORIES"],
            'FILE': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HARD_RECORDS_FILE_SUBCATEGORIES"],
            'MEDICAL': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HARD_RECORDS_MEDICAL_SUBCATEGORIES"]
        }),
        // Example: make some items unremovable (e.g. based on id)
        isItemRemovable: (item)=>item.id !== 'root',
        getItemKey: (item, index)=>item.id || `tmp-${index}`
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HardRecordsTab.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = HardRecordsTab;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/UserSelectFields.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/labels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArrayInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/ArrayInput.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Section.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
;
;
;
;
;
;
;
;
function HackingTab() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            pt: 2
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Section$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            title: "Hacking",
            direction: "column",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    name: "personalIce",
                    label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].personalIce,
                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PERSONAL_ICE"]
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx",
                    lineNumber: 15,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    name: "hackerSkill",
                    label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hackerSkill,
                    options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HACKER_STAT"]
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx",
                    lineNumber: 16,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    name: "hackerName",
                    label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].hackerName
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx",
                    lineNumber: 17,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$ArrayInput$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    name: "exploits",
                    label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].exploits
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx",
            lineNumber: 14,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx",
        lineNumber: 13,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = HackingTab;
}),
"[project]/src/mockData/accounts.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "accounts": ()=>accounts
});
const accounts = [
    {
        "id": "acc-0001",
        "type": "BUSINESS",
        "accountNumber": "AC-001001",
        "balance": 191373,
        "owners": [
            "clockwork",
            "avalon"
        ],
        "transactions": [
            {
                "id": "tr-00004",
                "from": "AC-001001",
                "to": "AC-001013",
                "amount": 2784,
                "timestamp": "2025-10-04T06:34:00",
                "title": "Invoice",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00021",
                "from": "AC-001012",
                "to": "AC-001001",
                "amount": 921,
                "timestamp": "2025-10-21T17:02:00",
                "title": "Donation",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00028",
                "from": "AC-001010",
                "to": "AC-001001",
                "amount": 949,
                "timestamp": "2025-10-28T08:02:00",
                "title": "Invoice",
                "orderingUser": "zeroDay",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00050",
                "from": "AC-001012",
                "to": "AC-001001",
                "amount": 692,
                "timestamp": "2025-10-05T05:03:00",
                "title": "Invoice",
                "orderingUser": "silkRoad",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00065",
                "from": "AC-001001",
                "to": "AC-001014",
                "amount": -4007,
                "timestamp": "2025-10-20T22:30:00",
                "title": "Refund",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00066",
                "from": "AC-001014",
                "to": "AC-001001",
                "amount": 767,
                "timestamp": "2025-10-21T22:15:00",
                "title": "Invoice",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00071",
                "from": "AC-001001",
                "to": "AC-001009",
                "amount": 377,
                "timestamp": "2025-10-26T22:08:00",
                "title": "Settlement",
                "orderingUser": "clockwork"
            },
            {
                "id": "tr-00072",
                "from": "AC-001003",
                "to": "AC-001001",
                "amount": 4707,
                "timestamp": "2025-10-27T14:21:00",
                "title": "Data Purchase",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00084",
                "from": "AC-001016",
                "to": "AC-001001",
                "amount": 753,
                "timestamp": "2025-11-08T18:01:00",
                "title": "Donation",
                "orderingUser": "ironBard",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00087",
                "from": "AC-001001",
                "to": "AC-001011",
                "amount": 3377,
                "timestamp": "2025-11-11T12:52:00",
                "title": "Consulting",
                "orderingUser": "avalon",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00089",
                "from": "AC-001012",
                "to": "AC-001001",
                "amount": 4449,
                "timestamp": "2025-11-13T06:33:00",
                "title": "Data Purchase",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00092",
                "from": "AC-001015",
                "to": "AC-001001",
                "amount": 4529,
                "timestamp": "2025-10-02T03:29:00",
                "title": "Payment",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00111",
                "from": "AC-001011",
                "to": "AC-001001",
                "amount": 4641,
                "timestamp": "2025-10-21T15:53:00",
                "title": "Settlement",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00120",
                "from": "AC-001001",
                "to": "AC-001002",
                "amount": 309,
                "timestamp": "2025-10-30T03:15:00",
                "title": "Data Purchase",
                "orderingUser": "avalon"
            }
        ]
    },
    {
        "id": "acc-0002",
        "type": "BUSINESS",
        "accountNumber": "AC-001002",
        "balance": 102730,
        "owners": [
            "synthia",
            "ghostcat",
            "blueComet"
        ],
        "transactions": [
            {
                "id": "tr-00006",
                "from": "AC-001010",
                "to": "AC-001002",
                "amount": 4433,
                "timestamp": "2025-10-06T05:26:00",
                "title": "Payment",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00010",
                "from": "AC-001003",
                "to": "AC-001002",
                "amount": 4790,
                "timestamp": "2025-10-10T05:03:00",
                "title": "Settlement",
                "orderingUser": "neonViper",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00024",
                "from": "AC-001002",
                "to": "AC-001006",
                "amount": 1455,
                "timestamp": "2025-10-24T23:59:00",
                "title": "Payment",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00033",
                "from": "AC-001002",
                "to": "AC-001007",
                "amount": 3449,
                "timestamp": "2025-11-02T05:39:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00036",
                "from": "AC-001002",
                "to": "AC-001010",
                "amount": -4227,
                "timestamp": "2025-11-05T07:43:00",
                "title": "Consulting",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00037",
                "from": "AC-001002",
                "to": "AC-001007",
                "amount": 1212,
                "timestamp": "2025-11-06T15:39:00",
                "title": "Payment",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00040",
                "from": "AC-001010",
                "to": "AC-001002",
                "amount": 4571,
                "timestamp": "2025-11-09T14:08:00",
                "title": "Refund",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00045",
                "from": "AC-001002",
                "to": "AC-001014",
                "amount": 3344,
                "timestamp": "2025-11-14T13:03:00",
                "title": "Settlement",
                "orderingUser": "ghostcat",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00054",
                "from": "AC-001002",
                "to": "AC-001005",
                "amount": 3884,
                "timestamp": "2025-10-09T14:44:00",
                "title": "Settlement",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00058",
                "from": "AC-001002",
                "to": "AC-001012",
                "amount": 4369,
                "timestamp": "2025-10-13T02:32:00",
                "title": "Donation",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00073",
                "from": "AC-001002",
                "to": "AC-001009",
                "amount": 3918,
                "timestamp": "2025-10-28T12:31:00",
                "title": "Refund",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00074",
                "from": "AC-001005",
                "to": "AC-001002",
                "amount": 1247,
                "timestamp": "2025-10-29T09:05:00",
                "title": "Refund",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00075",
                "from": "AC-001002",
                "to": "AC-001014",
                "amount": -4971,
                "timestamp": "2025-10-30T07:49:00",
                "title": "Refund",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00078",
                "from": "AC-001002",
                "to": "AC-001003",
                "amount": 1287,
                "timestamp": "2025-11-02T22:38:00",
                "title": "Data Purchase",
                "orderingUser": "ghostcat",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00079",
                "from": "AC-001014",
                "to": "AC-001002",
                "amount": 1901,
                "timestamp": "2025-11-03T22:55:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00085",
                "from": "AC-001002",
                "to": "AC-001006",
                "amount": -3859,
                "timestamp": "2025-11-09T08:11:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00106",
                "from": "AC-001002",
                "to": "AC-001006",
                "amount": -651,
                "timestamp": "2025-10-16T19:43:00",
                "title": "Refund",
                "orderingUser": "synthia",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00112",
                "from": "AC-001002",
                "to": "AC-001012",
                "amount": 1799,
                "timestamp": "2025-10-22T21:48:00",
                "title": "Settlement",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00113",
                "from": "AC-001002",
                "to": "AC-001010",
                "amount": 3616,
                "timestamp": "2025-10-23T23:08:00",
                "title": "Settlement",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00120",
                "from": "AC-001001",
                "to": "AC-001002",
                "amount": 309,
                "timestamp": "2025-10-30T03:15:00",
                "title": "Data Purchase",
                "orderingUser": "avalon"
            }
        ]
    },
    {
        "id": "acc-0003",
        "type": "BUSINESS",
        "accountNumber": "AC-001003",
        "balance": 131714,
        "owners": [
            "neonViper",
            "silkRoad",
            "redLotus"
        ],
        "transactions": [
            {
                "id": "tr-00001",
                "from": "AC-001003",
                "to": "AC-001017",
                "amount": 1954,
                "timestamp": "2025-10-01T06:34:00",
                "title": "Donation",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00005",
                "from": "AC-001003",
                "to": "AC-001014",
                "amount": 1508,
                "timestamp": "2025-10-05T02:28:00",
                "title": "Data Purchase",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00010",
                "from": "AC-001003",
                "to": "AC-001002",
                "amount": 4790,
                "timestamp": "2025-10-10T05:03:00",
                "title": "Settlement",
                "orderingUser": "neonViper",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00039",
                "from": "AC-001003",
                "to": "AC-001005",
                "amount": 50,
                "timestamp": "2025-11-08T07:11:00",
                "title": "Refund",
                "orderingUser": "silkRoad",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00052",
                "from": "AC-001011",
                "to": "AC-001003",
                "amount": 3857,
                "timestamp": "2025-10-07T01:22:00",
                "title": "Donation",
                "orderingUser": "silkRoad",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00053",
                "from": "AC-001007",
                "to": "AC-001003",
                "amount": 334,
                "timestamp": "2025-10-08T00:39:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00059",
                "from": "AC-001003",
                "to": "AC-001014",
                "amount": 4020,
                "timestamp": "2025-10-14T20:57:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00060",
                "from": "AC-001003",
                "to": "AC-001014",
                "amount": -1447,
                "timestamp": "2025-10-15T19:51:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00063",
                "from": "AC-001003",
                "to": "AC-001016",
                "amount": 2667,
                "timestamp": "2025-10-18T11:51:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00072",
                "from": "AC-001003",
                "to": "AC-001001",
                "amount": 4707,
                "timestamp": "2025-10-27T14:21:00",
                "title": "Data Purchase",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00078",
                "from": "AC-001002",
                "to": "AC-001003",
                "amount": 1287,
                "timestamp": "2025-11-02T22:38:00",
                "title": "Data Purchase",
                "orderingUser": "ghostcat",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00080",
                "from": "AC-001003",
                "to": "AC-001008",
                "amount": -2172,
                "timestamp": "2025-11-04T13:07:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00086",
                "from": "AC-001016",
                "to": "AC-001003",
                "amount": 3855,
                "timestamp": "2025-11-10T10:42:00",
                "title": "Data Purchase",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00095",
                "from": "AC-001016",
                "to": "AC-001003",
                "amount": 2268,
                "timestamp": "2025-10-05T08:52:00",
                "title": "Consulting",
                "orderingUser": "ironBard",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00098",
                "from": "AC-001003",
                "to": "AC-001008",
                "amount": 4689,
                "timestamp": "2025-10-08T01:20:00",
                "title": "Invoice",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00100",
                "from": "AC-001003",
                "to": "AC-001015",
                "amount": -821,
                "timestamp": "2025-10-10T23:09:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00102",
                "from": "AC-001012",
                "to": "AC-001003",
                "amount": -2696,
                "timestamp": "2025-10-12T20:45:00",
                "title": "Data Purchase",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00103",
                "from": "AC-001003",
                "to": "AC-001008",
                "amount": 2359,
                "timestamp": "2025-10-13T13:06:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00116",
                "from": "AC-001003",
                "to": "AC-001015",
                "amount": 621,
                "timestamp": "2025-10-26T21:46:00",
                "title": "Refund",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00117",
                "from": "AC-001012",
                "to": "AC-001003",
                "amount": 3237,
                "timestamp": "2025-10-27T03:29:00",
                "title": "Consulting",
                "orderingUser": "silkRoad",
                "hackData": "spoofed signature"
            }
        ]
    },
    {
        "id": "acc-0004",
        "type": "PRIVATE",
        "accountNumber": "AC-001004",
        "balance": 42019,
        "owners": [
            "avalon"
        ],
        "transactions": [
            {
                "id": "tr-00038",
                "from": "AC-001004",
                "to": "AC-001014",
                "amount": 4720,
                "timestamp": "2025-11-07T12:31:00",
                "title": "Donation",
                "orderingUser": "avalon",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00056",
                "from": "AC-001015",
                "to": "AC-001004",
                "amount": 4745,
                "timestamp": "2025-10-11T21:58:00",
                "title": "Consulting",
                "orderingUser": "synthia",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00062",
                "from": "AC-001004",
                "to": "AC-001015",
                "amount": 2002,
                "timestamp": "2025-10-17T21:24:00",
                "title": "Settlement",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00069",
                "from": "AC-001006",
                "to": "AC-001004",
                "amount": 4394,
                "timestamp": "2025-10-24T23:30:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00070",
                "from": "AC-001017",
                "to": "AC-001004",
                "amount": 1595,
                "timestamp": "2025-10-25T05:19:00",
                "title": "Invoice",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00077",
                "from": "AC-001016",
                "to": "AC-001004",
                "amount": 1707,
                "timestamp": "2025-11-01T02:10:00",
                "title": "Consulting",
                "orderingUser": "ironBard",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00104",
                "from": "AC-001004",
                "to": "AC-001006",
                "amount": 2458,
                "timestamp": "2025-10-14T01:18:00",
                "title": "Payment",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00114",
                "from": "AC-001004",
                "to": "AC-001011",
                "amount": 3408,
                "timestamp": "2025-10-24T17:56:00",
                "title": "Invoice",
                "orderingUser": "avalon"
            }
        ]
    },
    {
        "id": "acc-0005",
        "type": "PRIVATE",
        "accountNumber": "AC-001005",
        "balance": 40590,
        "owners": [
            "avalon"
        ],
        "transactions": [
            {
                "id": "tr-00012",
                "from": "AC-001005",
                "to": "AC-001008",
                "amount": -4747,
                "timestamp": "2025-10-12T02:26:00",
                "title": "Payment",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00015",
                "from": "AC-001005",
                "to": "AC-001007",
                "amount": 4149,
                "timestamp": "2025-10-15T02:56:00",
                "title": "Invoice",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00020",
                "from": "AC-001013",
                "to": "AC-001005",
                "amount": 2150,
                "timestamp": "2025-10-20T17:45:00",
                "title": "Donation",
                "orderingUser": "clockwork",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00022",
                "from": "AC-001009",
                "to": "AC-001005",
                "amount": 3525,
                "timestamp": "2025-10-22T11:57:00",
                "title": "Payment",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00029",
                "from": "AC-001005",
                "to": "AC-001014",
                "amount": 2836,
                "timestamp": "2025-10-29T16:07:00",
                "title": "Data Purchase",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00032",
                "from": "AC-001005",
                "to": "AC-001010",
                "amount": 4159,
                "timestamp": "2025-11-01T10:25:00",
                "title": "Donation",
                "orderingUser": "avalon",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00039",
                "from": "AC-001003",
                "to": "AC-001005",
                "amount": 50,
                "timestamp": "2025-11-08T07:11:00",
                "title": "Refund",
                "orderingUser": "silkRoad",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00044",
                "from": "AC-001010",
                "to": "AC-001005",
                "amount": 1240,
                "timestamp": "2025-11-13T04:45:00",
                "title": "Data Purchase",
                "orderingUser": "zeroDay",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00054",
                "from": "AC-001002",
                "to": "AC-001005",
                "amount": 3884,
                "timestamp": "2025-10-09T14:44:00",
                "title": "Settlement",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00074",
                "from": "AC-001005",
                "to": "AC-001002",
                "amount": 1247,
                "timestamp": "2025-10-29T09:05:00",
                "title": "Refund",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00081",
                "from": "AC-001010",
                "to": "AC-001005",
                "amount": 2181,
                "timestamp": "2025-11-05T05:50:00",
                "title": "Payment",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00093",
                "from": "AC-001005",
                "to": "AC-001016",
                "amount": -2395,
                "timestamp": "2025-10-03T13:53:00",
                "title": "Donation",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00101",
                "from": "AC-001012",
                "to": "AC-001005",
                "amount": 617,
                "timestamp": "2025-10-11T10:39:00",
                "title": "Refund",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00107",
                "from": "AC-001006",
                "to": "AC-001005",
                "amount": 1907,
                "timestamp": "2025-10-17T14:16:00",
                "title": "Donation",
                "orderingUser": "ghostcat"
            }
        ]
    },
    {
        "id": "acc-0006",
        "type": "PRIVATE",
        "accountNumber": "AC-001006",
        "balance": 26711,
        "owners": [
            "ghostcat"
        ],
        "transactions": [
            {
                "id": "tr-00009",
                "from": "AC-001006",
                "to": "AC-001007",
                "amount": -484,
                "timestamp": "2025-10-09T01:47:00",
                "title": "Donation",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00011",
                "from": "AC-001010",
                "to": "AC-001006",
                "amount": -566,
                "timestamp": "2025-10-11T07:25:00",
                "title": "Payment",
                "orderingUser": "zeroDay",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00016",
                "from": "AC-001006",
                "to": "AC-001010",
                "amount": 1297,
                "timestamp": "2025-10-16T22:19:00",
                "title": "Refund",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00024",
                "from": "AC-001002",
                "to": "AC-001006",
                "amount": 1455,
                "timestamp": "2025-10-24T23:59:00",
                "title": "Payment",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00026",
                "from": "AC-001006",
                "to": "AC-001012",
                "amount": 2505,
                "timestamp": "2025-10-26T21:12:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00043",
                "from": "AC-001006",
                "to": "AC-001015",
                "amount": 639,
                "timestamp": "2025-11-12T10:20:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00046",
                "from": "AC-001006",
                "to": "AC-001013",
                "amount": 4789,
                "timestamp": "2025-10-01T12:30:00",
                "title": "Refund",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00049",
                "from": "AC-001012",
                "to": "AC-001006",
                "amount": 3833,
                "timestamp": "2025-10-04T00:58:00",
                "title": "Settlement",
                "orderingUser": "silkRoad",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00055",
                "from": "AC-001017",
                "to": "AC-001006",
                "amount": -4968,
                "timestamp": "2025-10-10T03:49:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00069",
                "from": "AC-001006",
                "to": "AC-001004",
                "amount": 4394,
                "timestamp": "2025-10-24T23:30:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00085",
                "from": "AC-001002",
                "to": "AC-001006",
                "amount": -3859,
                "timestamp": "2025-11-09T08:11:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00104",
                "from": "AC-001004",
                "to": "AC-001006",
                "amount": 2458,
                "timestamp": "2025-10-14T01:18:00",
                "title": "Payment",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00106",
                "from": "AC-001002",
                "to": "AC-001006",
                "amount": -651,
                "timestamp": "2025-10-16T19:43:00",
                "title": "Refund",
                "orderingUser": "synthia",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00107",
                "from": "AC-001006",
                "to": "AC-001005",
                "amount": 1907,
                "timestamp": "2025-10-17T14:16:00",
                "title": "Donation",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00110",
                "from": "AC-001006",
                "to": "AC-001012",
                "amount": 4713,
                "timestamp": "2025-10-20T00:53:00",
                "title": "Donation",
                "orderingUser": "ghostcat"
            }
        ]
    },
    {
        "id": "acc-0007",
        "type": "PRIVATE",
        "accountNumber": "AC-001007",
        "balance": 31919,
        "owners": [
            "ghostcat"
        ],
        "transactions": [
            {
                "id": "tr-00007",
                "from": "AC-001014",
                "to": "AC-001007",
                "amount": 3290,
                "timestamp": "2025-10-07T00:24:00",
                "title": "Invoice",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00009",
                "from": "AC-001006",
                "to": "AC-001007",
                "amount": -484,
                "timestamp": "2025-10-09T01:47:00",
                "title": "Donation",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00015",
                "from": "AC-001005",
                "to": "AC-001007",
                "amount": 4149,
                "timestamp": "2025-10-15T02:56:00",
                "title": "Invoice",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00023",
                "from": "AC-001013",
                "to": "AC-001007",
                "amount": 2049,
                "timestamp": "2025-10-23T13:39:00",
                "title": "Consulting",
                "orderingUser": "clockwork",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00030",
                "from": "AC-001012",
                "to": "AC-001007",
                "amount": 2091,
                "timestamp": "2025-10-30T00:33:00",
                "title": "Donation",
                "orderingUser": "silkRoad",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00033",
                "from": "AC-001002",
                "to": "AC-001007",
                "amount": 3449,
                "timestamp": "2025-11-02T05:39:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00037",
                "from": "AC-001002",
                "to": "AC-001007",
                "amount": 1212,
                "timestamp": "2025-11-06T15:39:00",
                "title": "Payment",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00053",
                "from": "AC-001007",
                "to": "AC-001003",
                "amount": 334,
                "timestamp": "2025-10-08T00:39:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00057",
                "from": "AC-001011",
                "to": "AC-001007",
                "amount": -627,
                "timestamp": "2025-10-12T07:06:00",
                "title": "Donation",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            }
        ]
    },
    {
        "id": "acc-0008",
        "type": "PRIVATE",
        "accountNumber": "AC-001008",
        "balance": 5930,
        "owners": [
            "neonViper"
        ],
        "transactions": [
            {
                "id": "tr-00002",
                "from": "AC-001015",
                "to": "AC-001008",
                "amount": 3879,
                "timestamp": "2025-10-02T03:42:00",
                "title": "Invoice",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00012",
                "from": "AC-001005",
                "to": "AC-001008",
                "amount": -4747,
                "timestamp": "2025-10-12T02:26:00",
                "title": "Payment",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00025",
                "from": "AC-001008",
                "to": "AC-001009",
                "amount": 1309,
                "timestamp": "2025-10-25T15:14:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00048",
                "from": "AC-001016",
                "to": "AC-001008",
                "amount": 2240,
                "timestamp": "2025-10-03T12:21:00",
                "title": "Data Purchase",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00068",
                "from": "AC-001008",
                "to": "AC-001015",
                "amount": 2224,
                "timestamp": "2025-10-23T03:46:00",
                "title": "Consulting",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00080",
                "from": "AC-001003",
                "to": "AC-001008",
                "amount": -2172,
                "timestamp": "2025-11-04T13:07:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00094",
                "from": "AC-001014",
                "to": "AC-001008",
                "amount": -3746,
                "timestamp": "2025-10-04T06:58:00",
                "title": "Invoice",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00098",
                "from": "AC-001003",
                "to": "AC-001008",
                "amount": 4689,
                "timestamp": "2025-10-08T01:20:00",
                "title": "Invoice",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00103",
                "from": "AC-001003",
                "to": "AC-001008",
                "amount": 2359,
                "timestamp": "2025-10-13T13:06:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00105",
                "from": "AC-001008",
                "to": "AC-001014",
                "amount": 1197,
                "timestamp": "2025-10-15T18:43:00",
                "title": "Settlement",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00119",
                "from": "AC-001016",
                "to": "AC-001008",
                "amount": 522,
                "timestamp": "2025-10-29T20:26:00",
                "title": "Donation",
                "orderingUser": "ironBard"
            }
        ]
    },
    {
        "id": "acc-0009",
        "type": "PRIVATE",
        "accountNumber": "AC-001009",
        "balance": 14246,
        "owners": [
            "neonViper"
        ],
        "transactions": [
            {
                "id": "tr-00013",
                "from": "AC-001016",
                "to": "AC-001009",
                "amount": 1678,
                "timestamp": "2025-10-13T12:08:00",
                "title": "Invoice",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00018",
                "from": "AC-001010",
                "to": "AC-001009",
                "amount": -2313,
                "timestamp": "2025-10-18T10:13:00",
                "title": "Invoice",
                "orderingUser": "zeroDay",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00019",
                "from": "AC-001017",
                "to": "AC-001009",
                "amount": 421,
                "timestamp": "2025-10-19T08:02:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00022",
                "from": "AC-001009",
                "to": "AC-001005",
                "amount": 3525,
                "timestamp": "2025-10-22T11:57:00",
                "title": "Payment",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00025",
                "from": "AC-001008",
                "to": "AC-001009",
                "amount": 1309,
                "timestamp": "2025-10-25T15:14:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00027",
                "from": "AC-001011",
                "to": "AC-001009",
                "amount": 573,
                "timestamp": "2025-10-27T16:25:00",
                "title": "Consulting",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00042",
                "from": "AC-001015",
                "to": "AC-001009",
                "amount": 2030,
                "timestamp": "2025-11-11T15:40:00",
                "title": "Refund",
                "orderingUser": "synthia",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00064",
                "from": "AC-001017",
                "to": "AC-001009",
                "amount": 4888,
                "timestamp": "2025-10-19T16:12:00",
                "title": "Settlement",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00071",
                "from": "AC-001001",
                "to": "AC-001009",
                "amount": 377,
                "timestamp": "2025-10-26T22:08:00",
                "title": "Settlement",
                "orderingUser": "clockwork"
            },
            {
                "id": "tr-00073",
                "from": "AC-001002",
                "to": "AC-001009",
                "amount": 3918,
                "timestamp": "2025-10-28T12:31:00",
                "title": "Refund",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00090",
                "from": "AC-001009",
                "to": "AC-001016",
                "amount": 3626,
                "timestamp": "2025-11-14T17:08:00",
                "title": "Invoice",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00109",
                "from": "AC-001017",
                "to": "AC-001009",
                "amount": 3747,
                "timestamp": "2025-10-19T15:06:00",
                "title": "Invoice",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00115",
                "from": "AC-001009",
                "to": "AC-001017",
                "amount": 2237,
                "timestamp": "2025-10-25T09:47:00",
                "title": "Consulting",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00118",
                "from": "AC-001009",
                "to": "AC-001013",
                "amount": 3048,
                "timestamp": "2025-10-28T15:01:00",
                "title": "Donation",
                "orderingUser": "neonViper"
            }
        ]
    },
    {
        "id": "acc-0010",
        "type": "PRIVATE",
        "accountNumber": "AC-001010",
        "balance": 2196,
        "owners": [
            "zeroDay"
        ],
        "transactions": [
            {
                "id": "tr-00006",
                "from": "AC-001010",
                "to": "AC-001002",
                "amount": 4433,
                "timestamp": "2025-10-06T05:26:00",
                "title": "Payment",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00008",
                "from": "AC-001017",
                "to": "AC-001010",
                "amount": -3470,
                "timestamp": "2025-10-08T15:09:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00011",
                "from": "AC-001010",
                "to": "AC-001006",
                "amount": -566,
                "timestamp": "2025-10-11T07:25:00",
                "title": "Payment",
                "orderingUser": "zeroDay",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00016",
                "from": "AC-001006",
                "to": "AC-001010",
                "amount": 1297,
                "timestamp": "2025-10-16T22:19:00",
                "title": "Refund",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00017",
                "from": "AC-001016",
                "to": "AC-001010",
                "amount": 853,
                "timestamp": "2025-10-17T03:47:00",
                "title": "Consulting",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00018",
                "from": "AC-001010",
                "to": "AC-001009",
                "amount": -2313,
                "timestamp": "2025-10-18T10:13:00",
                "title": "Invoice",
                "orderingUser": "zeroDay",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00028",
                "from": "AC-001010",
                "to": "AC-001001",
                "amount": 949,
                "timestamp": "2025-10-28T08:02:00",
                "title": "Invoice",
                "orderingUser": "zeroDay",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00031",
                "from": "AC-001010",
                "to": "AC-001012",
                "amount": 3538,
                "timestamp": "2025-10-31T19:20:00",
                "title": "Donation",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00032",
                "from": "AC-001005",
                "to": "AC-001010",
                "amount": 4159,
                "timestamp": "2025-11-01T10:25:00",
                "title": "Donation",
                "orderingUser": "avalon",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00036",
                "from": "AC-001002",
                "to": "AC-001010",
                "amount": -4227,
                "timestamp": "2025-11-05T07:43:00",
                "title": "Consulting",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00040",
                "from": "AC-001010",
                "to": "AC-001002",
                "amount": 4571,
                "timestamp": "2025-11-09T14:08:00",
                "title": "Refund",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00044",
                "from": "AC-001010",
                "to": "AC-001005",
                "amount": 1240,
                "timestamp": "2025-11-13T04:45:00",
                "title": "Data Purchase",
                "orderingUser": "zeroDay",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00047",
                "from": "AC-001013",
                "to": "AC-001010",
                "amount": 3199,
                "timestamp": "2025-10-02T23:34:00",
                "title": "Settlement",
                "orderingUser": "clockwork",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00061",
                "from": "AC-001010",
                "to": "AC-001015",
                "amount": -3573,
                "timestamp": "2025-10-16T07:53:00",
                "title": "Consulting",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00076",
                "from": "AC-001010",
                "to": "AC-001015",
                "amount": 3631,
                "timestamp": "2025-10-31T13:19:00",
                "title": "Refund",
                "orderingUser": "zeroDay",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00081",
                "from": "AC-001010",
                "to": "AC-001005",
                "amount": 2181,
                "timestamp": "2025-11-05T05:50:00",
                "title": "Payment",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00088",
                "from": "AC-001010",
                "to": "AC-001015",
                "amount": 726,
                "timestamp": "2025-11-12T03:49:00",
                "title": "Consulting",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00096",
                "from": "AC-001013",
                "to": "AC-001010",
                "amount": -4813,
                "timestamp": "2025-10-06T04:28:00",
                "title": "Donation",
                "orderingUser": "clockwork",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00097",
                "from": "AC-001010",
                "to": "AC-001012",
                "amount": -2728,
                "timestamp": "2025-10-07T12:29:00",
                "title": "Refund",
                "orderingUser": "zeroDay",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00108",
                "from": "AC-001013",
                "to": "AC-001010",
                "amount": 4482,
                "timestamp": "2025-10-18T11:37:00",
                "title": "Payment",
                "orderingUser": "clockwork",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00113",
                "from": "AC-001002",
                "to": "AC-001010",
                "amount": 3616,
                "timestamp": "2025-10-23T23:08:00",
                "title": "Settlement",
                "orderingUser": "synthia"
            }
        ]
    },
    {
        "id": "acc-0011",
        "type": "PRIVATE",
        "accountNumber": "AC-001011",
        "balance": -622,
        "owners": [
            "silkRoad"
        ],
        "transactions": [
            {
                "id": "tr-00003",
                "from": "AC-001011",
                "to": "AC-001014",
                "amount": 3372,
                "timestamp": "2025-10-03T01:43:00",
                "title": "Refund",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00014",
                "from": "AC-001017",
                "to": "AC-001011",
                "amount": 599,
                "timestamp": "2025-10-14T18:06:00",
                "title": "Data Purchase",
                "orderingUser": "blueComet",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00027",
                "from": "AC-001011",
                "to": "AC-001009",
                "amount": 573,
                "timestamp": "2025-10-27T16:25:00",
                "title": "Consulting",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00051",
                "from": "AC-001017",
                "to": "AC-001011",
                "amount": 1738,
                "timestamp": "2025-10-06T12:17:00",
                "title": "Consulting",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00052",
                "from": "AC-001011",
                "to": "AC-001003",
                "amount": 3857,
                "timestamp": "2025-10-07T01:22:00",
                "title": "Donation",
                "orderingUser": "silkRoad",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00057",
                "from": "AC-001011",
                "to": "AC-001007",
                "amount": -627,
                "timestamp": "2025-10-12T07:06:00",
                "title": "Donation",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00087",
                "from": "AC-001001",
                "to": "AC-001011",
                "amount": 3377,
                "timestamp": "2025-11-11T12:52:00",
                "title": "Consulting",
                "orderingUser": "avalon",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00111",
                "from": "AC-001011",
                "to": "AC-001001",
                "amount": 4641,
                "timestamp": "2025-10-21T15:53:00",
                "title": "Settlement",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00114",
                "from": "AC-001004",
                "to": "AC-001011",
                "amount": 3408,
                "timestamp": "2025-10-24T17:56:00",
                "title": "Invoice",
                "orderingUser": "avalon"
            }
        ]
    },
    {
        "id": "acc-0012",
        "type": "PRIVATE",
        "accountNumber": "AC-001012",
        "balance": 36555,
        "owners": [
            "silkRoad"
        ],
        "transactions": [
            {
                "id": "tr-00021",
                "from": "AC-001012",
                "to": "AC-001001",
                "amount": 921,
                "timestamp": "2025-10-21T17:02:00",
                "title": "Donation",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00026",
                "from": "AC-001006",
                "to": "AC-001012",
                "amount": 2505,
                "timestamp": "2025-10-26T21:12:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00030",
                "from": "AC-001012",
                "to": "AC-001007",
                "amount": 2091,
                "timestamp": "2025-10-30T00:33:00",
                "title": "Donation",
                "orderingUser": "silkRoad",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00031",
                "from": "AC-001010",
                "to": "AC-001012",
                "amount": 3538,
                "timestamp": "2025-10-31T19:20:00",
                "title": "Donation",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00049",
                "from": "AC-001012",
                "to": "AC-001006",
                "amount": 3833,
                "timestamp": "2025-10-04T00:58:00",
                "title": "Settlement",
                "orderingUser": "silkRoad",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00050",
                "from": "AC-001012",
                "to": "AC-001001",
                "amount": 692,
                "timestamp": "2025-10-05T05:03:00",
                "title": "Invoice",
                "orderingUser": "silkRoad",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00058",
                "from": "AC-001002",
                "to": "AC-001012",
                "amount": 4369,
                "timestamp": "2025-10-13T02:32:00",
                "title": "Donation",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00089",
                "from": "AC-001012",
                "to": "AC-001001",
                "amount": 4449,
                "timestamp": "2025-11-13T06:33:00",
                "title": "Data Purchase",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00097",
                "from": "AC-001010",
                "to": "AC-001012",
                "amount": -2728,
                "timestamp": "2025-10-07T12:29:00",
                "title": "Refund",
                "orderingUser": "zeroDay",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00101",
                "from": "AC-001012",
                "to": "AC-001005",
                "amount": 617,
                "timestamp": "2025-10-11T10:39:00",
                "title": "Refund",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00102",
                "from": "AC-001012",
                "to": "AC-001003",
                "amount": -2696,
                "timestamp": "2025-10-12T20:45:00",
                "title": "Data Purchase",
                "orderingUser": "silkRoad"
            },
            {
                "id": "tr-00110",
                "from": "AC-001006",
                "to": "AC-001012",
                "amount": 4713,
                "timestamp": "2025-10-20T00:53:00",
                "title": "Donation",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00112",
                "from": "AC-001002",
                "to": "AC-001012",
                "amount": 1799,
                "timestamp": "2025-10-22T21:48:00",
                "title": "Settlement",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00117",
                "from": "AC-001012",
                "to": "AC-001003",
                "amount": 3237,
                "timestamp": "2025-10-27T03:29:00",
                "title": "Consulting",
                "orderingUser": "silkRoad",
                "hackData": "spoofed signature"
            }
        ]
    },
    {
        "id": "acc-0013",
        "type": "PRIVATE",
        "accountNumber": "AC-001013",
        "balance": 36564,
        "owners": [
            "clockwork"
        ],
        "transactions": [
            {
                "id": "tr-00004",
                "from": "AC-001001",
                "to": "AC-001013",
                "amount": 2784,
                "timestamp": "2025-10-04T06:34:00",
                "title": "Invoice",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00020",
                "from": "AC-001013",
                "to": "AC-001005",
                "amount": 2150,
                "timestamp": "2025-10-20T17:45:00",
                "title": "Donation",
                "orderingUser": "clockwork",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00023",
                "from": "AC-001013",
                "to": "AC-001007",
                "amount": 2049,
                "timestamp": "2025-10-23T13:39:00",
                "title": "Consulting",
                "orderingUser": "clockwork",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00034",
                "from": "AC-001016",
                "to": "AC-001013",
                "amount": 4493,
                "timestamp": "2025-11-03T06:27:00",
                "title": "Consulting",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00046",
                "from": "AC-001006",
                "to": "AC-001013",
                "amount": 4789,
                "timestamp": "2025-10-01T12:30:00",
                "title": "Refund",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00047",
                "from": "AC-001013",
                "to": "AC-001010",
                "amount": 3199,
                "timestamp": "2025-10-02T23:34:00",
                "title": "Settlement",
                "orderingUser": "clockwork",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00096",
                "from": "AC-001013",
                "to": "AC-001010",
                "amount": -4813,
                "timestamp": "2025-10-06T04:28:00",
                "title": "Donation",
                "orderingUser": "clockwork",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00099",
                "from": "AC-001014",
                "to": "AC-001013",
                "amount": 1251,
                "timestamp": "2025-10-09T16:37:00",
                "title": "Payment",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00108",
                "from": "AC-001013",
                "to": "AC-001010",
                "amount": 4482,
                "timestamp": "2025-10-18T11:37:00",
                "title": "Payment",
                "orderingUser": "clockwork",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00118",
                "from": "AC-001009",
                "to": "AC-001013",
                "amount": 3048,
                "timestamp": "2025-10-28T15:01:00",
                "title": "Donation",
                "orderingUser": "neonViper"
            }
        ]
    },
    {
        "id": "acc-0014",
        "type": "PRIVATE",
        "accountNumber": "AC-001014",
        "balance": -1529,
        "owners": [
            "redLotus"
        ],
        "transactions": [
            {
                "id": "tr-00003",
                "from": "AC-001011",
                "to": "AC-001014",
                "amount": 3372,
                "timestamp": "2025-10-03T01:43:00",
                "title": "Refund",
                "orderingUser": "silkRoad",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00005",
                "from": "AC-001003",
                "to": "AC-001014",
                "amount": 1508,
                "timestamp": "2025-10-05T02:28:00",
                "title": "Data Purchase",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00007",
                "from": "AC-001014",
                "to": "AC-001007",
                "amount": 3290,
                "timestamp": "2025-10-07T00:24:00",
                "title": "Invoice",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00029",
                "from": "AC-001005",
                "to": "AC-001014",
                "amount": 2836,
                "timestamp": "2025-10-29T16:07:00",
                "title": "Data Purchase",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00038",
                "from": "AC-001004",
                "to": "AC-001014",
                "amount": 4720,
                "timestamp": "2025-11-07T12:31:00",
                "title": "Donation",
                "orderingUser": "avalon",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00041",
                "from": "AC-001014",
                "to": "AC-001015",
                "amount": 4140,
                "timestamp": "2025-11-10T14:57:00",
                "title": "Refund",
                "orderingUser": "redLotus",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00045",
                "from": "AC-001002",
                "to": "AC-001014",
                "amount": 3344,
                "timestamp": "2025-11-14T13:03:00",
                "title": "Settlement",
                "orderingUser": "ghostcat",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00059",
                "from": "AC-001003",
                "to": "AC-001014",
                "amount": 4020,
                "timestamp": "2025-10-14T20:57:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00060",
                "from": "AC-001003",
                "to": "AC-001014",
                "amount": -1447,
                "timestamp": "2025-10-15T19:51:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00065",
                "from": "AC-001001",
                "to": "AC-001014",
                "amount": -4007,
                "timestamp": "2025-10-20T22:30:00",
                "title": "Refund",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00066",
                "from": "AC-001014",
                "to": "AC-001001",
                "amount": 767,
                "timestamp": "2025-10-21T22:15:00",
                "title": "Invoice",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00075",
                "from": "AC-001002",
                "to": "AC-001014",
                "amount": -4971,
                "timestamp": "2025-10-30T07:49:00",
                "title": "Refund",
                "orderingUser": "ghostcat",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00079",
                "from": "AC-001014",
                "to": "AC-001002",
                "amount": 1901,
                "timestamp": "2025-11-03T22:55:00",
                "title": "Donation",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00094",
                "from": "AC-001014",
                "to": "AC-001008",
                "amount": -3746,
                "timestamp": "2025-10-04T06:58:00",
                "title": "Invoice",
                "orderingUser": "redLotus",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00099",
                "from": "AC-001014",
                "to": "AC-001013",
                "amount": 1251,
                "timestamp": "2025-10-09T16:37:00",
                "title": "Payment",
                "orderingUser": "redLotus"
            },
            {
                "id": "tr-00105",
                "from": "AC-001008",
                "to": "AC-001014",
                "amount": 1197,
                "timestamp": "2025-10-15T18:43:00",
                "title": "Settlement",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            }
        ]
    },
    {
        "id": "acc-0015",
        "type": "PRIVATE",
        "accountNumber": "AC-001015",
        "balance": 44389,
        "owners": [
            "synthia"
        ],
        "transactions": [
            {
                "id": "tr-00002",
                "from": "AC-001015",
                "to": "AC-001008",
                "amount": 3879,
                "timestamp": "2025-10-02T03:42:00",
                "title": "Invoice",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00035",
                "from": "AC-001016",
                "to": "AC-001015",
                "amount": 3624,
                "timestamp": "2025-11-04T16:30:00",
                "title": "Donation",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00041",
                "from": "AC-001014",
                "to": "AC-001015",
                "amount": 4140,
                "timestamp": "2025-11-10T14:57:00",
                "title": "Refund",
                "orderingUser": "redLotus",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00042",
                "from": "AC-001015",
                "to": "AC-001009",
                "amount": 2030,
                "timestamp": "2025-11-11T15:40:00",
                "title": "Refund",
                "orderingUser": "synthia",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00043",
                "from": "AC-001006",
                "to": "AC-001015",
                "amount": 639,
                "timestamp": "2025-11-12T10:20:00",
                "title": "Invoice",
                "orderingUser": "ghostcat"
            },
            {
                "id": "tr-00056",
                "from": "AC-001015",
                "to": "AC-001004",
                "amount": 4745,
                "timestamp": "2025-10-11T21:58:00",
                "title": "Consulting",
                "orderingUser": "synthia",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00061",
                "from": "AC-001010",
                "to": "AC-001015",
                "amount": -3573,
                "timestamp": "2025-10-16T07:53:00",
                "title": "Consulting",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00062",
                "from": "AC-001004",
                "to": "AC-001015",
                "amount": 2002,
                "timestamp": "2025-10-17T21:24:00",
                "title": "Settlement",
                "orderingUser": "avalon",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00068",
                "from": "AC-001008",
                "to": "AC-001015",
                "amount": 2224,
                "timestamp": "2025-10-23T03:46:00",
                "title": "Consulting",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00076",
                "from": "AC-001010",
                "to": "AC-001015",
                "amount": 3631,
                "timestamp": "2025-10-31T13:19:00",
                "title": "Refund",
                "orderingUser": "zeroDay",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00082",
                "from": "AC-001017",
                "to": "AC-001015",
                "amount": 1023,
                "timestamp": "2025-11-06T22:25:00",
                "title": "Donation",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00083",
                "from": "AC-001017",
                "to": "AC-001015",
                "amount": -663,
                "timestamp": "2025-11-07T23:20:00",
                "title": "Payment",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00088",
                "from": "AC-001010",
                "to": "AC-001015",
                "amount": 726,
                "timestamp": "2025-11-12T03:49:00",
                "title": "Consulting",
                "orderingUser": "zeroDay"
            },
            {
                "id": "tr-00092",
                "from": "AC-001015",
                "to": "AC-001001",
                "amount": 4529,
                "timestamp": "2025-10-02T03:29:00",
                "title": "Payment",
                "orderingUser": "synthia"
            },
            {
                "id": "tr-00100",
                "from": "AC-001003",
                "to": "AC-001015",
                "amount": -821,
                "timestamp": "2025-10-10T23:09:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00116",
                "from": "AC-001003",
                "to": "AC-001015",
                "amount": 621,
                "timestamp": "2025-10-26T21:46:00",
                "title": "Refund",
                "orderingUser": "neonViper"
            }
        ]
    },
    {
        "id": "acc-0016",
        "type": "PRIVATE",
        "accountNumber": "AC-001016",
        "balance": 13003,
        "owners": [
            "ironBard"
        ],
        "transactions": [
            {
                "id": "tr-00013",
                "from": "AC-001016",
                "to": "AC-001009",
                "amount": 1678,
                "timestamp": "2025-10-13T12:08:00",
                "title": "Invoice",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00017",
                "from": "AC-001016",
                "to": "AC-001010",
                "amount": 853,
                "timestamp": "2025-10-17T03:47:00",
                "title": "Consulting",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00034",
                "from": "AC-001016",
                "to": "AC-001013",
                "amount": 4493,
                "timestamp": "2025-11-03T06:27:00",
                "title": "Consulting",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00035",
                "from": "AC-001016",
                "to": "AC-001015",
                "amount": 3624,
                "timestamp": "2025-11-04T16:30:00",
                "title": "Donation",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00048",
                "from": "AC-001016",
                "to": "AC-001008",
                "amount": 2240,
                "timestamp": "2025-10-03T12:21:00",
                "title": "Data Purchase",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00063",
                "from": "AC-001003",
                "to": "AC-001016",
                "amount": 2667,
                "timestamp": "2025-10-18T11:51:00",
                "title": "Data Purchase",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00067",
                "from": "AC-001017",
                "to": "AC-001016",
                "amount": -4539,
                "timestamp": "2025-10-22T23:35:00",
                "title": "Consulting",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00077",
                "from": "AC-001016",
                "to": "AC-001004",
                "amount": 1707,
                "timestamp": "2025-11-01T02:10:00",
                "title": "Consulting",
                "orderingUser": "ironBard",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00084",
                "from": "AC-001016",
                "to": "AC-001001",
                "amount": 753,
                "timestamp": "2025-11-08T18:01:00",
                "title": "Donation",
                "orderingUser": "ironBard",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00086",
                "from": "AC-001016",
                "to": "AC-001003",
                "amount": 3855,
                "timestamp": "2025-11-10T10:42:00",
                "title": "Data Purchase",
                "orderingUser": "ironBard"
            },
            {
                "id": "tr-00090",
                "from": "AC-001009",
                "to": "AC-001016",
                "amount": 3626,
                "timestamp": "2025-11-14T17:08:00",
                "title": "Invoice",
                "orderingUser": "neonViper"
            },
            {
                "id": "tr-00091",
                "from": "AC-001017",
                "to": "AC-001016",
                "amount": 999,
                "timestamp": "2025-10-01T07:45:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00093",
                "from": "AC-001005",
                "to": "AC-001016",
                "amount": -2395,
                "timestamp": "2025-10-03T13:53:00",
                "title": "Donation",
                "orderingUser": "avalon"
            },
            {
                "id": "tr-00095",
                "from": "AC-001016",
                "to": "AC-001003",
                "amount": 2268,
                "timestamp": "2025-10-05T08:52:00",
                "title": "Consulting",
                "orderingUser": "ironBard",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00119",
                "from": "AC-001016",
                "to": "AC-001008",
                "amount": 522,
                "timestamp": "2025-10-29T20:26:00",
                "title": "Donation",
                "orderingUser": "ironBard"
            }
        ]
    },
    {
        "id": "acc-0017",
        "type": "PRIVATE",
        "accountNumber": "AC-001017",
        "balance": 58,
        "owners": [
            "blueComet"
        ],
        "transactions": [
            {
                "id": "tr-00001",
                "from": "AC-001003",
                "to": "AC-001017",
                "amount": 1954,
                "timestamp": "2025-10-01T06:34:00",
                "title": "Donation",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00008",
                "from": "AC-001017",
                "to": "AC-001010",
                "amount": -3470,
                "timestamp": "2025-10-08T15:09:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00014",
                "from": "AC-001017",
                "to": "AC-001011",
                "amount": 599,
                "timestamp": "2025-10-14T18:06:00",
                "title": "Data Purchase",
                "orderingUser": "blueComet",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00019",
                "from": "AC-001017",
                "to": "AC-001009",
                "amount": 421,
                "timestamp": "2025-10-19T08:02:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00051",
                "from": "AC-001017",
                "to": "AC-001011",
                "amount": 1738,
                "timestamp": "2025-10-06T12:17:00",
                "title": "Consulting",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00055",
                "from": "AC-001017",
                "to": "AC-001006",
                "amount": -4968,
                "timestamp": "2025-10-10T03:49:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "packet jitter high"
            },
            {
                "id": "tr-00064",
                "from": "AC-001017",
                "to": "AC-001009",
                "amount": 4888,
                "timestamp": "2025-10-19T16:12:00",
                "title": "Settlement",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00067",
                "from": "AC-001017",
                "to": "AC-001016",
                "amount": -4539,
                "timestamp": "2025-10-22T23:35:00",
                "title": "Consulting",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00070",
                "from": "AC-001017",
                "to": "AC-001004",
                "amount": 1595,
                "timestamp": "2025-10-25T05:19:00",
                "title": "Invoice",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00082",
                "from": "AC-001017",
                "to": "AC-001015",
                "amount": 1023,
                "timestamp": "2025-11-06T22:25:00",
                "title": "Donation",
                "orderingUser": "blueComet"
            },
            {
                "id": "tr-00083",
                "from": "AC-001017",
                "to": "AC-001015",
                "amount": -663,
                "timestamp": "2025-11-07T23:20:00",
                "title": "Payment",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00091",
                "from": "AC-001017",
                "to": "AC-001016",
                "amount": 999,
                "timestamp": "2025-10-01T07:45:00",
                "title": "Donation",
                "orderingUser": "blueComet",
                "hackData": "spoofed signature"
            },
            {
                "id": "tr-00109",
                "from": "AC-001017",
                "to": "AC-001009",
                "amount": 3747,
                "timestamp": "2025-10-19T15:06:00",
                "title": "Invoice",
                "orderingUser": "blueComet",
                "hackData": "routed via onion relays"
            },
            {
                "id": "tr-00115",
                "from": "AC-001009",
                "to": "AC-001017",
                "amount": 2237,
                "timestamp": "2025-10-25T09:47:00",
                "title": "Consulting",
                "orderingUser": "neonViper",
                "hackData": "routed via onion relays"
            }
        ]
    }
];
}),
"[project]/src/components/forms/Card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-ssr] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardHeader/CardHeader.js [app-ssr] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Notes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const notesStyles = (theme)=>({
        flex: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px dashed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.8)}`,
        boxShadow: `0 0 14px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.38)}`
    });
const primaryStyles = (theme)=>({
        flex: 1,
        background: `linear-gradient(135deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.18)} 0%, 
    ${theme.palette.background.paper} 35%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.06)} 100%)`,
        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.5)}`,
        boxShadow: `0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.22)}`
    });
const secondaryStyles = (theme)=>({
        flex: 1,
        background: `linear-gradient(135deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.18)} 0%, 
    ${theme.palette.background.paper} 35%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.06)} 100%)`,
        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5)}`,
        boxShadow: `0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.22)}`
    });
const normalStyles = (theme)=>({
        flex: 1,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 0 10px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.22)}`
    });
function Card({ variant = 'normal', children, icon, title, subTitle, sx, action, contentSx }) {
    const header = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (typeof title === 'string') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: "subtitle2",
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/forms/Card.tsx",
            lineNumber: 51,
            columnNumber: 47
        }, this);
        return title;
    }, [
        title
    ]);
    const subHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (typeof subTitle === 'string') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: "caption",
            children: subTitle
        }, void 0, false, {
            fileName: "[project]/src/components/forms/Card.tsx",
            lineNumber: 56,
            columnNumber: 50
        }, this);
        return subTitle;
    }, [
        subTitle
    ]);
    const avatar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (icon) return icon;
        if (variant === 'notes') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/forms/Card.tsx",
            lineNumber: 62,
            columnNumber: 41
        }, this);
    }, [
        variant,
        icon
    ]);
    const styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (variant === 'notes') return (t)=>({
                ...notesStyles(t),
                ...sx
            });
        if (variant === 'primary') return (t)=>({
                ...primaryStyles(t),
                ...sx
            });
        if (variant === 'secondary') return (t)=>({
                ...secondaryStyles(t),
                ...sx
            });
        if (variant === 'normal') return (t)=>({
                ...normalStyles(t),
                ...sx
            });
        return sx;
    }, [
        variant,
        sx
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        sx: styles,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                avatar: avatar,
                title: header,
                subheader: subHeader,
                action: action
            }, void 0, false, {
                fileName: "[project]/src/components/forms/Card.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                fileName: "[project]/src/components/forms/Card.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                sx: contentSx,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/forms/Card.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/forms/Card.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = Card;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/labels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/configs/UserSelectFields.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Savings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Savings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CreditScore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CreditScore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Bolt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$SwapHoriz$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/SwapHoriz.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const BankingSummary = ({ totalBalance, accountCount, privateCount, businessCount, mainAccountNumber, hasAccounts, mainAccountOptions })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        direction: "row",
        gap: 2,
        alignItems: "stretch",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "primary",
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Savings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 32,
                    columnNumber: 43
                }, void 0),
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "subtitle2",
                    sx: {
                        textTransform: 'uppercase'
                    },
                    children: "Net balance"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, void 0),
                contentSx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "h4",
                        sx: {
                            fontWeight: 700
                        },
                        children: [
                            totalBalance.toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }),
                            ' ',
                            "¤"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "body2",
                        sx: {
                            opacity: 0.8,
                            marginTop: 0.5
                        },
                        children: [
                            "Across ",
                            accountCount || 'no',
                            " accounts"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CreditScore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 49,
                    columnNumber: 25
                }, void 0),
                title: "Account mix",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    direction: "column",
                    spacing: 2,
                    flexWrap: "wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountsChip, {
                            label: `Private: ${privateCount}`,
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                fontSize: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                                lineNumber: 51,
                                columnNumber: 76
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                            lineNumber: 51,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountsChip, {
                            label: `Business: ${businessCount}`,
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$SwapHoriz$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                fontSize: "small"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                                lineNumber: 52,
                                columnNumber: 78
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                            lineNumber: 52,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            name: "wealth",
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].wealth,
                            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$configs$2f$UserSelectFields$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEALTH_LEVELS"]
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                            lineNumber: 53,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 57,
                    columnNumber: 25
                }, void 0),
                title: "Main account",
                subTitle: mainAccountNumber ? 'mainAccountNumber' : 'No main account chosen yet.',
                children: hasAccounts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    name: "mainAccount",
                    label: "Main account (account number)",
                    options: mainAccountOptions,
                    helperText: "Choose which account should be treated as main."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 61,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "body2",
                    sx: {
                        opacity: 0.8,
                        fontStyle: 'italic',
                        marginTop: 0.5
                    },
                    children: "This user has no registered accounts yet."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 68,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "notes",
                title: "Epsilon banking notes",
                subTitle: "Off-game notes for writers about this character's finances.",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    name: "epsilonBankingNotes",
                    label: "Banking notes",
                    placeholder: "Meta notes, hooks, secrets, planned twists about this character's banking and finances...",
                    multiline: true,
                    minRows: 2
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
function AccountsChip({ label, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
        size: "small",
        label: label,
        icon: icon,
        sx: (theme)=>({
                borderRadius: 999,
                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.4)}`,
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.12)
            })
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx",
        lineNumber: 92,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = BankingSummary;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-ssr] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Radio/Radio.js [app-ssr] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$DeleteOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/DeleteOutline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Bolt.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const AccountBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        position: 'relative',
        borderRadius: theme.shape.borderRadius * 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
        padding: theme.spacing(1.25),
        transition: 'all 0.15s ease-out',
        '&:hover': {
            boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.3)}`,
            borderColor: theme.palette.primary.main
        }
    }));
const AccountsList = ({ accounts, selectedAccountId, mainAccountNumber, onSelectAccount, onRemoveAccount, onSetMainAccount, onOpenAddDialog, canAdd })=>{
    const isMain = (account)=>!!mainAccountNumber && mainAccountNumber === account.accountNumber;
    if (!accounts.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            title: "Accounts",
            sx: {
                height: '100%'
            },
            action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                size: "small",
                startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                    lineNumber: 63,
                    columnNumber: 59
                }, void 0),
                onClick: onOpenAddDialog,
                disabled: !canAdd,
                children: "Add"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                lineNumber: 63,
                columnNumber: 27
            }, void 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "body2",
                    sx: {
                        opacity: 0.8,
                        fontStyle: 'italic',
                        marginTop: 1
                    },
                    children: "This user has no registered accounts yet."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                    lineNumber: 66,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                lineNumber: 65,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
            lineNumber: 62,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    /*

     */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        title: "Accounts",
        subTitle: "Select an account to inspect its flow.",
        sx: {
            height: '100%'
        },
        contentSx: {
            pl: 0,
            pr: 0
        },
        action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
            size: "small",
            startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                lineNumber: 82,
                columnNumber: 55
            }, void 0),
            onClick: onOpenAddDialog,
            disabled: !canAdd,
            children: "Add"
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
            lineNumber: 82,
            columnNumber: 23
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
            sx: {
                paddingTop: 1,
                paddingBottom: 2
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                spacing: 1.25,
                children: accounts.map((account)=>{
                    const isSelected = selectedAccountId === account.id;
                    const main = isMain(account);
                    const isBusiness = account.type === 'BUSINESS';
                    const name = isBusiness ? account.name : undefined;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountBox, {
                        sx: (theme)=>({
                                borderColor: isSelected ? theme.palette.primary.main : theme.palette.divider,
                                backgroundColor: isSelected ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.06) : theme.palette.background.paper
                            }),
                        onClick: ()=>onSelectAccount(account.id),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                            direction: "row",
                            spacing: 1,
                            alignItems: "flex-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    checked: isSelected,
                                    value: account.id,
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                    lineNumber: 104,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                            direction: "row",
                                            spacing: 1,
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        minWidth: 0
                                                    },
                                                    children: isBusiness && name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "body2",
                                                                sx: {
                                                                    fontWeight: 600,
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis'
                                                                },
                                                                children: name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                                lineNumber: 115,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                variant: "caption",
                                                                sx: {
                                                                    fontFamily: 'monospace',
                                                                    opacity: 0.85
                                                                },
                                                                children: account.accountNumber
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        sx: {
                                                            fontFamily: 'monospace',
                                                            fontWeight: 600
                                                        },
                                                        children: account.accountNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                    direction: "row",
                                                    spacing: 0.5,
                                                    alignItems: "center",
                                                    children: [
                                                        main && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                            size: "small",
                                                            label: "MAIN",
                                                            sx: (theme)=>({
                                                                    height: 18,
                                                                    fontSize: '0.6rem',
                                                                    borderRadius: 999,
                                                                    border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.7)}`,
                                                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.14)
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                            title: "Set as main account",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                                size: "small",
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    onSetMainAccount(account);
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "small"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 57
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                            title: "Remove from this user",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                                size: "small",
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    onRemoveAccount(account);
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$DeleteOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "small"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 57
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                            lineNumber: 106,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                            direction: "row",
                                            spacing: 1,
                                            alignItems: "center",
                                            sx: {
                                                marginTop: 0.5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                    size: "small",
                                                    label: account.type === 'BUSINESS' ? 'BUSINESS' : 'PRIVATE',
                                                    sx: (theme)=>({
                                                            height: 20,
                                                            fontSize: '0.65rem',
                                                            borderRadius: 999,
                                                            border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.6)}`,
                                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.08)
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    sx: {
                                                        marginLeft: 'auto'
                                                    },
                                                    children: [
                                                        account.balance >= 0 ? '+' : '-',
                                                        Math.abs(account.balance ?? 0).toLocaleString('en-US', {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }),
                                                        ' ',
                                                        "¤"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                            lineNumber: 187,
                                            columnNumber: 41
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        account.owners?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                opacity: 0.75,
                                                marginTop: 0.5
                                            },
                                            children: [
                                                "Owners: ",
                                                account.owners.join(', ')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                            lineNumber: 215,
                                            columnNumber: 45
                                        }, ("TURBOPACK compile-time value", void 0)) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                                    lineNumber: 105,
                                    columnNumber: 37
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                            lineNumber: 103,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0))
                    }, account.id, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                        lineNumber: 93,
                        columnNumber: 29
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
                lineNumber: 85,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
            lineNumber: 84,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx",
        lineNumber: 81,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AccountsList;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-ssr] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-ssr] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-ssr] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-ssr] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-ssr] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Card.tsx [app-ssr] (ecmascript)");
;
;
;
;
const ScrollBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        overflow: 'auto',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`
    }));
const formatTimestamp = (ts)=>{
    if (!ts) return '-';
    let date = null;
    if (typeof ts === 'string' || typeof ts === 'number') {
        const d = new Date(ts);
        if (!Number.isNaN(d.getTime())) {
            date = d;
        }
    } else if (ts?.toDate && typeof ts.toDate === 'function') {
        try {
            date = ts.toDate();
        } catch  {
            date = null;
        }
    } else if (typeof ts === 'object' && 'seconds' in ts) {
        const seconds = ts.seconds;
        date = new Date(seconds * 1000);
    }
    if (!date) return String(ts);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};
const getAccountLabel = (account)=>{
    const base = account.type === 'BUSINESS' ? 'Business' : 'Private';
    if (account.type === 'BUSINESS' && account.name) {
        const name = account.name;
        return `${name} • ${account.accountNumber} • ${base}`;
    }
    return `${base} • ${account.accountNumber}`;
};
const TransactionsTable = ({ account })=>{
    const transactions = account?.transactions;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        title: "Transactions",
        subTitle: account ? getAccountLabel(account) : 'No account selected',
        sx: {
            flex: 2
        },
        contentSx: {
            pt: 2,
            pb: 4
        },
        children: !account || !transactions?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: "body2",
            sx: {
                opacity: 0.8,
                fontStyle: 'italic',
                marginTop: 2
            },
            children: "No transactions for this account yet."
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
            lineNumber: 76,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBox, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                size: "small",
                stickyHeader: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                    children: "Title"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                    lineNumber: 87,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                    children: "Flow"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                    lineNumber: 88,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                    align: "right",
                                    children: "Amount"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                    lineNumber: 89,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                    children: "Ordering user"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                    lineNumber: 90,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                    children: "Timestamp"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                    lineNumber: 91,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                            lineNumber: 86,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                        lineNumber: 85,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                        children: transactions.slice().reverse().map((tx)=>{
                            const isOutgoing = tx.from === account.accountNumber;
                            const sign = isOutgoing ? '-' : '+';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                hover: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                        sx: {
                                            maxWidth: 200
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            noWrap: true,
                                            title: tx.title,
                                            children: tx.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                            lineNumber: 105,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                        lineNumber: 104,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            sx: {
                                                fontFamily: 'monospace'
                                            },
                                            children: [
                                                tx.from,
                                                ' \u2192 ',
                                                tx.to
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                            lineNumber: 110,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                        lineNumber: 109,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                        align: "right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "body2",
                                            sx: {
                                                fontWeight: 600
                                            },
                                            children: [
                                                sign,
                                                tx.amount.toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }),
                                                ' ',
                                                "¤"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                            lineNumber: 120,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                        lineNumber: 119,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            children: tx.orderingUser
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                            lineNumber: 130,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                        lineNumber: 129,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            children: formatTimestamp(tx.timestamp)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                            lineNumber: 135,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                        lineNumber: 134,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, tx.id, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                                lineNumber: 103,
                                columnNumber: 41
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                        lineNumber: 94,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
                lineNumber: 84,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
            lineNumber: 83,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = TransactionsTable;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogActions/DialogActions.js [app-ssr] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Radio/Radio.js [app-ssr] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
;
;
;
;
const OptionBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        borderRadius: theme.shape.borderRadius * 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
        padding: theme.spacing(1),
        transition: 'all 0.15s ease-out',
        '&:hover': {
            borderColor: theme.palette.primary.main
        }
    }));
const AddAccountDialog = ({ open, availableAccounts, onClose, onAdd })=>{
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        if (!availableAccounts.length) {
            setSelectedId(null);
            return;
        }
        const first = availableAccounts[0];
        setSelectedId(first.id ?? first.accountNumber);
    }, [
        open,
        availableAccounts
    ]);
    const handleConfirm = ()=>{
        if (!selectedId) return;
        const acc = availableAccounts.find((a)=>a.id === selectedId || a.accountNumber === selectedId) ?? null;
        if (!acc) return;
        onAdd(acc);
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: onClose,
        fullWidth: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                children: "Add account to this user"
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                dividers: true,
                children: availableAccounts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "body2",
                    sx: {
                        opacity: 0.8,
                        fontStyle: 'italic',
                        marginTop: 1
                    },
                    children: "All mock accounts are already attached to this user."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                    lineNumber: 70,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    spacing: 1.25,
                    sx: {
                        marginTop: 1
                    },
                    children: availableAccounts.map((acc)=>{
                        const isBusiness = acc.type === 'BUSINESS';
                        const name = isBusiness ? acc.name : undefined;
                        const valueKey = acc.id ?? acc.accountNumber;
                        const isSelected = selectedId === valueKey;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OptionBox, {
                            sx: (theme)=>({
                                    borderColor: isSelected ? theme.palette.primary.main : theme.palette.divider,
                                    backgroundColor: isSelected ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.06) : theme.palette.background.paper
                                }),
                            onClick: ()=>setSelectedId(valueKey),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                direction: "row",
                                spacing: 1,
                                alignItems: "center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                        checked: isSelected,
                                        size: "small"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                        lineNumber: 100,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1,
                                            minWidth: 0
                                        },
                                        children: [
                                            isBusiness && name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        sx: {
                                                            fontWeight: 600,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        },
                                                        children: name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "caption",
                                                        sx: {
                                                            fontFamily: 'monospace',
                                                            opacity: 0.85
                                                        },
                                                        children: acc.accountNumber
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                sx: {
                                                    fontFamily: 'monospace',
                                                    fontWeight: 600
                                                },
                                                children: acc.accountNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                                lineNumber: 126,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                sx: {
                                                    opacity: 0.8
                                                },
                                                children: acc.type === 'BUSINESS' ? 'Business account' : 'Private account'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                                lineNumber: 136,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                        lineNumber: 101,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                                lineNumber: 99,
                                columnNumber: 37
                            }, ("TURBOPACK compile-time value", void 0))
                        }, valueKey, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                            lineNumber: 87,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                    lineNumber: 77,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: onClose,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                        lineNumber: 150,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        variant: "contained",
                        onClick: handleConfirm,
                        disabled: !availableAccounts.length || !selectedId,
                        children: "Add"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                        lineNumber: 151,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
                lineNumber: 149,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AddAccountDialog;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$accounts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mockData/accounts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$BankingSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/BankingSummary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$AccountsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AccountsList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$TransactionsTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/TransactionsTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$AddAccountDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/banking/AddAccountDialog.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const Root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        paddingTop: theme.spacing(2)
    }));
const hasSameAccount = (a, b)=>{
    if (a.id && b.id && a.id === b.id) return true;
    return a.accountNumber === b.accountNumber;
};
const BankingTab = ()=>{
    const { values, setFieldValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormikContext"])();
    const accounts = values.accounts ?? [];
    const mainAccountNumber = values.mainAccount;
    const [selectedAccountId, setSelectedAccountId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(accounts[0]?.id ?? null);
    const [addDialogOpen, setAddDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!accounts.length) {
            setSelectedAccountId(null);
            return;
        }
        if (!selectedAccountId || !accounts.some((a)=>a.id === selectedAccountId)) {
            setSelectedAccountId(accounts[0].id);
        }
    }, [
        accounts,
        selectedAccountId
    ]);
    const selectedAccount = accounts.find((a)=>a.id === selectedAccountId) ?? accounts[0] ?? null;
    const totalBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>accounts.reduce((sum, acc)=>sum + (acc.balance ?? 0), 0), [
        accounts
    ]);
    const privateCount = accounts.filter((a)=>a.type === 'PRIVATE').length;
    const businessCount = accounts.filter((a)=>a.type === 'BUSINESS').length;
    const mainAccountOptions = accounts.map((account)=>{
        const isBusiness = account.type === 'BUSINESS';
        const name = isBusiness ? account.name : undefined;
        return {
            value: account.accountNumber,
            label: name ? `${account.accountNumber} – ${name}` : `${account.accountNumber} – ${isBusiness ? 'Business' : 'Private'}`
        };
    }) ?? [];
    const availableAccounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mockData$2f$accounts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accounts"].filter((mockAcc)=>!accounts.some((userAcc)=>hasSameAccount(userAcc, mockAcc))), [
        accounts
    ]);
    const handleAddAccount = (account)=>{
        const next = [
            ...accounts,
            account
        ];
        setFieldValue('accounts', next);
        if (!selectedAccountId) {
            setSelectedAccountId(account.id ?? null);
        }
        if (!mainAccountNumber) {
            setFieldValue('mainAccount', account.accountNumber);
        }
    };
    const handleRemoveAccount = (account)=>{
        const nextAccounts = accounts.filter((a)=>!hasSameAccount(a, account));
        setFieldValue('accounts', nextAccounts);
        if (selectedAccountId && hasSameAccount(account, selectedAccount)) {
            const nextSelected = nextAccounts[0];
            setSelectedAccountId(nextSelected ? nextSelected.id ?? null : null);
        }
        if (mainAccountNumber === account.accountNumber) {
            const nextMain = nextAccounts[0]?.accountNumber ?? '';
            setFieldValue('mainAccount', nextMain);
        }
    };
    const handleSetMainAccount = (account)=>{
        setFieldValue('mainAccount', account.accountNumber);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Root, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$BankingSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                totalBalance: totalBalance,
                accountCount: accounts.length,
                privateCount: privateCount,
                businessCount: businessCount,
                mainAccountNumber: mainAccountNumber,
                hasAccounts: accounts.length > 0,
                mainAccountOptions: mainAccountOptions
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                direction: "row",
                gap: 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$AccountsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        accounts: accounts,
                        selectedAccountId: selectedAccountId,
                        mainAccountNumber: mainAccountNumber,
                        onSelectAccount: setSelectedAccountId,
                        onRemoveAccount: handleRemoveAccount,
                        onSetMainAccount: handleSetMainAccount,
                        onOpenAddDialog: ()=>setAddDialogOpen(true),
                        canAdd: availableAccounts.length > 0
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx",
                        lineNumber: 122,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$TransactionsTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        account: selectedAccount
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx",
                        lineNumber: 132,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$banking$2f$AddAccountDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: addDialogOpen,
                onClose: ()=>setAddDialogOpen(false),
                availableAccounts: availableAccounts,
                onAdd: handleAddAccount
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx",
        lineNumber: 110,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BankingTab;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-ssr] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardHeader/CardHeader.js [app-ssr] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Chat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Chat.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Notes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/labels.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const SummaryCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])(({ theme })=>({
        flex: 1,
        background: `linear-gradient(135deg,
    ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.18)} 0%,
    ${theme.palette.background.paper} 35%,
    ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.06)} 100%
  )`,
        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.5)}`,
        boxShadow: `0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.22)}`
    }));
const NotesCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])(({ theme })=>({
        flex: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px dashed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.8)}`,
        boxShadow: `0 0 14px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.38)}`
    }));
const ConversationsSummary = ({ totalConversations })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
        direction: "row",
        gap: 2,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                        avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Chat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 33,
                            columnNumber: 29
                        }, void 0),
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "subtitle2",
                            sx: {
                                textTransform: 'uppercase'
                            },
                            children: "Conversations"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 35,
                            columnNumber: 25
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 32,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h4",
                                sx: {
                                    fontWeight: 700
                                },
                                children: totalConversations
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                                lineNumber: 41,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body2",
                                sx: {
                                    opacity: 0.8,
                                    marginTop: 0.5
                                },
                                children: "Active threads linked to this character"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                                lineNumber: 44,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotesCard, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                        avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 52,
                            columnNumber: 29
                        }, void 0),
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "subtitle2",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].chatNotesTitle
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 53,
                            columnNumber: 28
                        }, void 0),
                        subheader: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "caption",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].chatNotesDescription
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 54,
                            columnNumber: 32
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            color: "secondary",
                            name: "epsilonNotes",
                            multiline: true,
                            minRows: 2,
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].epsilonConversationNotes,
                            placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].epsilonConversationNotesPlaceholder
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 58,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotesCard, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                        avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 66,
                            columnNumber: 29
                        }, void 0),
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "subtitle2",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].plotNotesTitle
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 67,
                            columnNumber: 28
                        }, void 0),
                        subheader: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "caption",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].plotNotesDescription
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 68,
                            columnNumber: 32
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            color: "secondary",
                            name: "epsilonNotes",
                            multiline: true,
                            minRows: 2,
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].epsilonPlots,
                            placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].epsilonPlotsPlaceholder
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx",
        lineNumber: 30,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ConversationsSummary;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-ssr] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardHeader/CardHeader.js [app-ssr] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChatBubble$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ChatBubble.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Workspaces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Workspaces.js [app-ssr] (ecmascript)");
;
;
;
;
;
const ListCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])(({ theme })=>({
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 0 10px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.22)}`,
        display: 'flex',
        flexDirection: 'column'
    }));
const ConversationBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        position: 'relative',
        borderRadius: theme.shape.borderRadius * 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
        padding: theme.spacing(1.25),
        transition: 'all 0.15s ease-out',
        '&:hover': {
            boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.3)}`,
            borderColor: theme.palette.primary.main
        }
    }));
const SecondaryText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        opacity: 0.75,
        fontSize: theme.typography.caption.fontSize
    }));
const formatParticipants = (participants)=>participants.length ? participants.join(', ') : 'No participants';
const ConversationsList = ({ conversations, selectedConversationId, onSelectConversation })=>{
    const hasConversations = conversations.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ListCard, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "subtitle1",
                    sx: {
                        textTransform: 'uppercase'
                    },
                    children: "Conversations"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                    lineNumber: 67,
                    columnNumber: 21
                }, void 0),
                subheader: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "caption",
                    children: "Pick a thread to inspect its message log and notes."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                    lineNumber: 72,
                    columnNumber: 21
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                sx: {
                    paddingTop: 1,
                    paddingBottom: 2
                },
                children: !hasConversations ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "body2",
                    sx: {
                        opacity: 0.8,
                        fontStyle: 'italic',
                        marginTop: 1
                    },
                    children: "No conversations linked to this character yet."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                    lineNumber: 80,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                    spacing: 1.25,
                    children: conversations.map((conv)=>{
                        const isSelected = selectedConversationId === conv.id;
                        const title = conv.title && conv.title.trim().length > 0 ? conv.title : formatParticipants(conv.participants);
                        const totalMessages = conv.messages?.length ?? 0;
                        const lastMessage = conv.messages?.[conv.messages.length - 1];
                        let lastTimestampLabel = 'No messages';
                        if (lastMessage?.timestamp) {
                            let date = null;
                            const ts = lastMessage.timestamp;
                            if (typeof ts === 'string' || typeof ts === 'number') {
                                const d = new Date(ts);
                                if (!Number.isNaN(d.getTime())) date = d;
                            } else if (ts?.toDate && typeof ts.toDate === 'function') {
                                try {
                                    date = ts.toDate();
                                } catch  {
                                    date = null;
                                }
                            } else if (typeof ts === 'object' && 'seconds' in ts) {
                                const seconds = ts.seconds;
                                date = new Date(seconds * 1000);
                            }
                            if (date) {
                                lastTimestampLabel = date.toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                            }
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ConversationBox, {
                            sx: (theme)=>({
                                    borderColor: isSelected ? theme.palette.primary.main : theme.palette.divider,
                                    backgroundColor: isSelected ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.06) : theme.palette.background.paper
                                }),
                            onClick: ()=>onSelectConversation(conv.id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                spacing: 0.75,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                        direction: "row",
                                        spacing: 1,
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                direction: "row",
                                                spacing: 1,
                                                alignItems: "center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ChatBubble$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        variant: "body2",
                                                        sx: {
                                                            fontWeight: 600,
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis'
                                                        },
                                                        title: title,
                                                        children: title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                lineNumber: 148,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                                direction: "row",
                                                spacing: 0.5,
                                                alignItems: "center",
                                                children: [
                                                    conv.gigConversation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                        size: "small",
                                                        label: "GIG",
                                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Workspaces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            fontSize: "small"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 63
                                                        }, void 0),
                                                        sx: (theme)=>({
                                                                height: 20,
                                                                fontSize: '0.7rem',
                                                                borderRadius: 999,
                                                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.7)}`,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.18)
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                        size: "small",
                                                        label: `${totalMessages} msg`,
                                                        sx: (theme)=>({
                                                                height: 20,
                                                                fontSize: '0.7rem',
                                                                borderRadius: 999,
                                                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.7)}`,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.12)
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                                lineNumber: 164,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                        lineNumber: 142,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryText, {
                                        noWrap: true,
                                        children: [
                                            "Participants: ",
                                            formatParticipants(conv.participants)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                        lineNumber: 205,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    conv.anonymizedUsers?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryText, {
                                        noWrap: true,
                                        children: [
                                            "Anonymized: ",
                                            conv.anonymizedUsers.join(', ')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                        lineNumber: 209,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0)) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SecondaryText, {
                                        children: [
                                            "Last activity: ",
                                            lastTimestampLabel
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                        lineNumber: 213,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                                lineNumber: 141,
                                columnNumber: 37
                            }, ("TURBOPACK compile-time value", void 0))
                        }, conv.id, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                            lineNumber: 129,
                            columnNumber: 33
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                    lineNumber: 87,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx",
        lineNumber: 64,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ConversationsList;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-ssr] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardHeader/CardHeader.js [app-ssr] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript) <export default as Stack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Message$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Message.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LockOpen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/LockOpen.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const MessagesCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])(({ theme })=>({
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 0 10px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.22)}`,
        display: 'flex',
        flexDirection: 'column'
    }));
const ScrollBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        maxHeight: 400,
        overflow: 'auto',
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1)
    }));
const OwnBubble = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        maxWidth: '70%',
        borderRadius: theme.shape.borderRadius * 2,
        padding: theme.spacing(1),
        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.9)}`,
        background: `linear-gradient(135deg,
    ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.35)} 0%,
    ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95)} 80%
  )`,
        boxShadow: `0 0 14px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.5)}`
    }));
const OtherBubble = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        maxWidth: '70%',
        borderRadius: theme.shape.borderRadius * 2,
        padding: theme.spacing(1),
        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.35)}`,
        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.96)
    }));
const MetaRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        opacity: 0.8,
        fontSize: theme.typography.caption.fontSize,
        letterSpacing: 0.5,
        textTransform: 'uppercase'
    }));
const EpsilonRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        opacity: 0.9,
        fontSize: theme.typography.caption.fontSize,
        fontStyle: 'italic'
    }));
const NotesHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(({ theme })=>({
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0.5),
        textTransform: 'uppercase',
        fontSize: theme.typography.caption.fontSize,
        letterSpacing: 1,
        opacity: 0.9
    }));
const equalParticipants = (a, b)=>{
    if (a.length !== b.length) return false;
    const sa = [
        ...a
    ].sort();
    const sb = [
        ...b
    ].sort();
    return sa.every((v, i)=>v === sb[i]);
};
const formatTimestamp = (ts)=>{
    if (!ts) return '-';
    let date = null;
    if (typeof ts === 'string' || typeof ts === 'number') {
        const d = new Date(ts);
        if (!Number.isNaN(d.getTime())) {
            date = d;
        }
    } else if (ts?.toDate && typeof ts.toDate === 'function') {
        try {
            date = ts.toDate();
        } catch  {
            date = null;
        }
    } else if (typeof ts === 'object' && 'seconds' in ts) {
        const seconds = ts.seconds;
        date = new Date(seconds * 1000);
    }
    if (!date) return String(ts);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};
const getConversationLabel = (conv)=>{
    if (conv.title && conv.title.trim().length > 0) return conv.title;
    return conv.participants.length ? conv.participants.join(', ') : `Conversation ${conv.id}`;
};
const ConversationMessages = ({ conversation })=>{
    const { values, setFieldValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormikContext"])();
    const messages = conversation?.messages ?? [];
    const handle = values.handle;
    const epsilonNotes = values.epsilonConversationsNotes ?? [];
    let conversationNoteIndex = -1;
    if (conversation) {
        const foundIndex = epsilonNotes.findIndex((entry)=>equalParticipants(entry.participants ?? [], conversation.participants ?? []));
        conversationNoteIndex = foundIndex !== -1 ? foundIndex : epsilonNotes.length;
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!conversation) return;
        const arr = values.epsilonConversationsNotes ?? [];
        const exists = arr.some((entry)=>equalParticipants(entry.participants ?? [], conversation.participants ?? []));
        if (!exists) {
            const next = [
                ...arr,
                {
                    participants: conversation.participants,
                    notes: ''
                }
            ];
            setFieldValue('epsilonConversationsNotes', next);
        }
    }, [
        conversation?.id,
        conversation?.participants,
        setFieldValue,
        values.epsilonConversationsNotes
    ]);
    const noteName = conversation && conversationNoteIndex >= 0 ? `epsilonConversationsNotes[${conversationNoteIndex}].notes` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MessagesCard, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Message$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                    lineNumber: 172,
                    columnNumber: 25
                }, void 0),
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "subtitle1",
                    sx: {
                        textTransform: 'uppercase'
                    },
                    children: "Messages"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                    lineNumber: 174,
                    columnNumber: 21
                }, void 0),
                subheader: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "caption",
                    children: conversation ? getConversationLabel(conversation) : 'No conversation selected'
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                    lineNumber: 179,
                    columnNumber: 21
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                lineNumber: 171,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                lineNumber: 184,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                sx: {
                    paddingTop: 1,
                    paddingBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                },
                children: [
                    !conversation || !messages.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "body2",
                        sx: {
                            opacity: 0.8,
                            fontStyle: 'italic',
                            marginTop: 2
                        },
                        children: "No messages in this conversation yet."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                        lineNumber: 187,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBox, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                            spacing: 1.25,
                            children: messages.slice().sort((a, b)=>{
                                const ta = a.timestamp ?? 0;
                                const tb = b.timestamp ?? 0;
                                return ta < tb ? -1 : ta > tb ? 1 : 0;
                            }).map((msg)=>{
                                const own = msg.sender === handle;
                                const Bubble = own ? OwnBubble : OtherBubble;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: 'flex',
                                        justifyContent: own ? 'flex-end' : 'flex-start'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Bubble, {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Stack$3e$__["Stack"], {
                                            spacing: 0.5,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaRow, {
                                                    children: [
                                                        own ? 'YOU' : msg.sender,
                                                        ' ',
                                                        "• ",
                                                        msg.type,
                                                        msg.hacker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                ' ',
                                                                "• ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$LockOpen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    fontSize: "inherit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                                                    lineNumber: 223,
                                                                    columnNumber: 67
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                " ",
                                                                msg.hacker
                                                            ]
                                                        }, void 0, true),
                                                        ' ',
                                                        "• ",
                                                        formatTimestamp(msg.timestamp)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    variant: "body2",
                                                    sx: {
                                                        whiteSpace: 'pre-wrap',
                                                        wordBreak: 'break-word'
                                                    },
                                                    children: msg.data
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MetaRow, {
                                                    children: [
                                                        "Read by ",
                                                        (msg.readBy ?? []).length,
                                                        " user",
                                                        (msg.readBy ?? []).length === 1 ? '' : 's'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 53
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                msg.epsilonNote && msg.epsilonNote.trim().length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EpsilonRow, {
                                                    children: [
                                                        "Msg epsilon note: ",
                                                        msg.epsilonNote
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 57
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                            lineNumber: 216,
                                            columnNumber: 49
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                        lineNumber: 215,
                                        columnNumber: 45
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, msg.id, false, {
                                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                    lineNumber: 208,
                                    columnNumber: 41
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                            lineNumber: 195,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                        lineNumber: 194,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    conversation && noteName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotesHeader, {
                                children: "Conversation epsilon notes"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                lineNumber: 257,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                name: noteName,
                                label: "Off-game notes about this conversation",
                                placeholder: "Why this thread matters, secrets, future reveals, social fallout...",
                                fullWidth: true,
                                multiline: true,
                                minRows: 2,
                                maxRows: 6
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                                lineNumber: 258,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
                lineNumber: 185,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx",
        lineNumber: 170,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ConversationMessages;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-ssr] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardContent/CardContent.js [app-ssr] (ecmascript) <export default as CardContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CardHeader/CardHeader.js [app-ssr] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$List$2f$List$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/List/List.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItem/ListItem.js [app-ssr] (ecmascript) <export default as ListItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemText$2f$ListItemText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItemText$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ListItemText/ListItemText.js [app-ssr] (ecmascript) <export default as ListItemText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/Input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Notes.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const NotesCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"])(({ theme })=>({
        backgroundColor: theme.palette.background.paper,
        border: `1px dashed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)}`,
        boxShadow: `0 0 14px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.18)}`,
        marginTop: theme.spacing(1)
    }));
const EpsilonConversationsNotes = ()=>{
    const { values } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormikContext"])();
    const epsilonNotesArray = values.epsilonConversationsNotes ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NotesCard, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardHeader$2f$CardHeader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                avatar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Notes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                    lineNumber: 34,
                    columnNumber: 25
                }, void 0),
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "subtitle2",
                    sx: {
                        textTransform: 'uppercase'
                    },
                    children: "Epsilon conversation overview"
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                    lineNumber: 36,
                    columnNumber: 21
                }, void 0),
                subheader: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    variant: "caption",
                    children: "High-level meta about this character's conversations and social ties."
                }, void 0, false, {
                    fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                    lineNumber: 41,
                    columnNumber: 21
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CardContent$2f$CardContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CardContent$3e$__["CardContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        name: "epsilonNotes",
                        label: "Global epsilon notes",
                        placeholder: "High-level meta about this character's social life, recurring NPCs, unresolved threads...",
                        fullWidth: true,
                        multiline: true,
                        minRows: 2,
                        maxRows: 6
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    epsilonNotesArray.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "subtitle2",
                                sx: {
                                    marginTop: 2,
                                    marginBottom: 1,
                                    opacity: 0.85
                                },
                                children: "Per-conversation notes (read-only summary)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                                lineNumber: 60,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$List$2f$List$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                dense: true,
                                children: epsilonNotesArray.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItem$3e$__["ListItem"], {
                                        alignItems: "flex-start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ListItemText$2f$ListItemText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItemText$3e$__["ListItemText"], {
                                            primary: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                sx: {
                                                    fontWeight: 600
                                                },
                                                children: [
                                                    "Participants: ",
                                                    (item.participants ?? []).join(', ') || '—'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                                                lineNumber: 71,
                                                columnNumber: 45
                                            }, void 0),
                                            secondary: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "body2",
                                                sx: {
                                                    opacity: 0.85,
                                                    whiteSpace: 'pre-wrap'
                                                },
                                                children: item.notes || 'No notes'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                                                lineNumber: 76,
                                                columnNumber: 45
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                                            lineNumber: 69,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, index, false, {
                                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                                        lineNumber: 68,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                                lineNumber: 66,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = EpsilonConversationsNotes;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$ConversationsSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsSummary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$ConversationsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationsList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$ConversationMessages$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/ConversationMessages.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$EpsilonConversationsNotes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/conversations/EpsilonConversationsNotes.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const Root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        paddingTop: theme.spacing(2)
    }));
const ConversationsTab = ()=>{
    const { values } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFormikContext"])();
    const conversations = values.conversations ?? [];
    const [selectedConversationId, setSelectedConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(conversations[0]?.id ?? null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!conversations.length) {
            setSelectedConversationId(null);
            return;
        }
        if (!selectedConversationId || !conversations.some((c)=>c.id === selectedConversationId)) {
            setSelectedConversationId(conversations[0].id);
        }
    }, [
        conversations,
        selectedConversationId
    ]);
    const selectedConversation = conversations.find((c)=>c.id === selectedConversationId) ?? conversations[0] ?? null;
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const total = conversations.length;
        let messages = 0;
        let gigCount = 0;
        for (const conv of conversations){
            messages += conv.messages?.length ?? 0;
            if (conv.gigConversation) gigCount += 1;
        }
        return {
            total,
            messages,
            gigCount
        };
    }, [
        conversations
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Root, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$ConversationsSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                totalConversations: stats.total,
                totalMessages: stats.messages,
                gigConversations: stats.gigCount
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                container: true,
                spacing: 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        item: true,
                        xs: 12,
                        md: 4,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$ConversationsList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            conversations: conversations,
                            selectedConversationId: selectedConversationId,
                            onSelectConversation: setSelectedConversationId
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        item: true,
                        xs: 12,
                        md: 8,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$ConversationMessages$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            conversation: selectedConversation
                        }, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$conversations$2f$EpsilonConversationsNotes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ConversationsTab;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/users/_components/UserForm.tsx
__turbopack_context__.s({
    "UserForm": ()=>UserForm,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formik/dist/formik.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/schema.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$FormDebug$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/FormDebug.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Tabs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$MainTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/MainTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$HardRecordsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HardRecordsTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$HackingTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/HackingTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$BankingTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/BankingTab.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$ConversationsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/tabs/ConversationsTab.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
/** Canonical, type-safe defaults for a new user */ const BASE_USER = {
    id: '',
    active: false,
    roles: [],
    handle: '',
    name: '',
    surname: '',
    species: '',
    cyberwareLevel: 0,
    faction: '',
    factionRankPublic: '',
    factionRankActual: '',
    speciesPrivate: '',
    hardRecords: [],
    favoriteUsers: [],
    offGameRecords: [],
    combatSkill: 0,
    // 🔧 Keep only the canonical key; remove the duplicate:
    // hackerSkill: 0, // <-- removed to satisfy the User type
    hackingSkill: 0,
    confrontationistVsAgreeable: 0,
    cowardVsBrave: 0,
    talkativeVsSilent: 0,
    thinkerVsDoer: 0,
    vibe: '',
    mindRecords: [],
    affiliation: '',
    profession: '',
    wealth: '',
    accounts: [],
    mainAccount: '',
    conversations: [],
    network: '',
    networkAdmin: '',
    subnetwork: '',
    gigReputation: {},
    personalIce: 0,
    hackerName: '',
    exploits: []
};
const mergeInitials = (partial)=>({
        ...BASE_USER,
        ...partial,
        // Ensure arrays/objects are always defined
        roles: partial?.roles ?? BASE_USER.roles,
        hardRecords: partial?.hardRecords ?? BASE_USER.hardRecords,
        favoriteUsers: partial?.favoriteUsers ?? BASE_USER.favoriteUsers,
        offGameRecords: partial?.offGameRecords ?? BASE_USER.offGameRecords,
        mindRecords: partial?.mindRecords ?? BASE_USER.mindRecords,
        accounts: partial?.accounts ?? BASE_USER.accounts,
        conversations: partial?.conversations ?? BASE_USER.conversations,
        exploits: partial?.exploits ?? BASE_USER.exploits,
        gigReputation: partial?.gigReputation ?? BASE_USER.gigReputation
    });
const UserForm = ({ initialUser })=>{
    const [tab, setTab] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]('main');
    const initialValues = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>mergeInitials(initialUser), [
        initialUser
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Formik"], {
        initialValues: initialValues,
        validationSchema: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["userSchema"],
        onSubmit: (values)=>{
            console.log('SUBMIT', values);
            alert('Submitted! Check console for output.');
        },
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formik$2f$dist$2f$formik$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Form"], {
            noValidate: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Tabs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                value: tab,
                onChange: (_, v)=>setTab(v),
                tabs: [
                    {
                        key: 'main',
                        label: 'Main',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$MainTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 111,
                            columnNumber: 66
                        }, void 0)
                    },
                    {
                        key: 'hard-records',
                        label: 'Hard Records',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$HardRecordsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 112,
                            columnNumber: 82
                        }, void 0)
                    },
                    {
                        key: 'mind-records',
                        label: 'Mind Records',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$HardRecordsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 113,
                            columnNumber: 82
                        }, void 0)
                    },
                    {
                        key: 'off-game-records',
                        label: 'OffGame Records',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$HardRecordsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 114,
                            columnNumber: 89
                        }, void 0)
                    },
                    {
                        key: 'hacking',
                        label: 'Hacking',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$HackingTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 115,
                            columnNumber: 72
                        }, void 0)
                    },
                    {
                        key: 'conversations',
                        label: 'Conversations',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$ConversationsTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 116,
                            columnNumber: 84
                        }, void 0)
                    },
                    {
                        key: 'banking',
                        label: 'Banking',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$tabs$2f$BankingTab$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 117,
                            columnNumber: 72
                        }, void 0)
                    },
                    {
                        key: 'debug',
                        label: 'Debug',
                        component: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$FormDebug$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormDebug"], {}, void 0, false, {
                            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                            lineNumber: 118,
                            columnNumber: 68
                        }, void 0)
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
            lineNumber: 106,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx",
        lineNumber: 95,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = UserForm;
}),
"[project]/src/app/(app)/creator/users/_components/UserForm/index.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$UserForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/UserForm.tsx [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$UserForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/src/app/(app)/creator/users/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// users/page.tsx
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(app)/creator/users/_components/UserForm/index.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$creator$2f$users$2f$_components$2f$UserForm$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/(app)/creator/users/page.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = Page;
}),

};

//# sourceMappingURL=src_e70abb1b._.js.map