<script setup lang="ts">
interface IToast {
    color:
        | "slate"
        | "gray"
        | "zinc"
        | "neutral"
        | "stone"
        | "red"
        | "orange"
        | "amber"
        | "yellow"
        | "lime"
        | "green"
        | "emerald"
        | "teal"
        | "cyan"
        | "sky"
        | "blue"
        | "indigo"
        | "purple"
        | "fuchsia"
        | "pink"
        | "rose";
    message: string;
    icon: "paper-plane" | "bell" | "circle-check" | "circle-exclamation";
}

const props = defineProps<IToast>();

const notifClassesFirstTransition = [
    "animation-spawn-first-card",
    "min-h-[67px]",
    "p-4",
    "space-x-4",
    "w-[80px]",
    "text-gray-100",
    "rounded-lg",
    "shadow",
    "space-x",
];
const notifClassesSecondTransition = [
    "animation-spawn-second-card",
    "w-full",
    "max-w-xs",
    "divide-x",
    "divide-gray-700",
];
const notificationContent = ref<any>("Bienvenue sur zombo.com");

onMounted(() => {
    const root = document.documentElement;
    const toastIcon = document.getElementById("toast-icon");
    const style = window.getComputedStyle(toastIcon);
    const iconColor = style.getPropertyValue("color");
    root.style.setProperty("--border-toast-color", iconColor);
    const monElement = document.getElementById("mon-element");
    const monBouton = document.getElementById("mon-bouton");
    const fermerBouton = document.getElementById("fermer-bouton");
    setTimeout(() => {
        fermerBouton?.click();
    }, 4000);
    if (monElement) {
        monElement.classList.remove("hidden");
        setTimeout(() => {
            monElement.classList.add(
                "mon-element-cercle",
                "mon-element-decale"
            );
        }, 100);
    }
    if (fermerBouton && monElement) {
        fermerBouton.addEventListener("click", () => {
            if (monElement.classList.contains("animation-end-second-card")) {
                monElement.classList.remove("mon-element-decale");
                monElement.classList.add("mon-element-cache");
                monElement.addEventListener(
                    "transitionend",
                    async () => {
                        monElement.classList.add("hidden");
                        monElement.children[1].classList.add("hidden");
                        monElement.classList.remove(
                            "animation-end-second-card"
                        );
                        fermerBouton.classList.add("hidden");
                        for (
                            let i = 0;
                            i < notifClassesSecondTransition.length;
                            i++
                        ) {
                            monElement.classList.remove(
                                notifClassesSecondTransition[i]
                            );
                        }
                        for (
                            let i = 0;
                            i < notifClassesFirstTransition.length;
                            i++
                        ) {
                            monElement.classList.remove(
                                notifClassesFirstTransition[i]
                            );
                        }
                        for (let i = 0; i < props.message.length; i++) {
                            hideSpan(
                                monElement.children[1].children[0].children[
                                    i
                                ] as HTMLSpanElement
                            );
                        }
                    },
                    { once: true }
                );
            }
        });

        monElement.addEventListener("transitionend", async () => {
            if (monElement.classList.contains("mon-element-cercle")) {
                for (let i = 0; i < notifClassesFirstTransition.length; i++) {
                    monElement.classList.add(notifClassesFirstTransition[i]);
                }
                monElement.classList.remove("mon-element-cercle");
            } else if (
                monElement.classList.contains("animation-spawn-first-card") &&
                monElement.offsetWidth == 80
            ) {
                monElement.classList.remove("w-[80px]");
                monElement.classList.remove("animation-spawn-first-card");

                for (let i = 0; i < notifClassesSecondTransition.length; i++) {
                    monElement.classList.add(notifClassesSecondTransition[i]);
                }
                monElement.classList.remove("animation-spawn-second-card");
                monElement.classList.add("animation-end-second-card");
                monElement.children[1].classList.remove("hidden");
                setTimeout(async () => {
                    monElement.classList.add("animate-borders");
                    for (let i = 0; i < props.message.length; i++) {
                        await displaySpan(
                            monElement.children[1].children[0].children[
                                i
                            ] as HTMLSpanElement
                        );
                    }
                    fermerBouton.classList.remove("hidden");
                }, 200);
            }
        });
    }
});
const displaySpan = async (span: HTMLSpanElement) => {
    await timeout(1300 / props.message.length);
    return span.classList.remove("hidden");
};
const hideSpan = async (span: HTMLSpanElement) => {
    await timeout(1300 / props.message.length);
    return span.classList.add("hidden");
};
function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>
<template>
    <div
        id="mon-element"
        class="hidden absolute right-0 left-0 w-10 ml-auto mr-auto top-0 flex items-center justify-center bg-slate-800 opacity-40 overflow-hidden z-10"
        role="alert"
    >
        <FontAwesomeIcon id="toast-icon" :icon="['fa', icon]" style="width: 20px; height: 20px;" :class="'text-' + color + '-500'" />
        <div class="flex items-center justify-between w-full hidden z-50">
            <p id="textAnimation" class="ml-3">
                <span v-for="c in message" :key="c" class="hidden">{{
                    c
                }}</span>
            </p>

            <button
                id="fermer-bouton"
                type="button"
                class="text-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center hover:bg-gray-600 hover:text-white hidden"
            >
                <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
    </div>
</template>
<style scoped>
:root {
    --border-toast-color: red;
}

#mon-element.animate-borders::before {
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0px;
    margin-bottom: auto;
    margin-top: auto;
    width: 0;
    transition: all 0.5s ease-in-out;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    animation: borderGrowLeft 1.5s forwards;
}

#mon-element.animate-borders::after {
    content: "";
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 0px;
    margin-bottom: auto;
    margin-top: auto;
    width: 0;
    transition: all 0.5s ease-in-out;
    animation: borderGrowRight 1.5s forwards;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

@keyframes borderGrowLeft {
    from {
        height: 0;
        border-left: 2px solid var(--border-toast-color);
    }

    30% {
        height: 100%;
        min-height: 67px;
        border-left: 2px solid var(--border-toast-color);
        width: 0;
        border-top: 2px solid var(--border-toast-color);
        border-bottom: 2px solid var(--border-toast-color);
    }

    to {
        height: 100%;
        min-height: 67px;
        border-left: 2px solid var(--border-toast-color);
        width: 51%;
        border-top: 2px solid var(--border-toast-color);
        border-bottom: 2px solid var(--border-toast-color);
    }
}

@keyframes borderGrowRight {
    from {
        height: 0;
        border-right: 2px solid var(--border-toast-color);
    }

    30% {
        height: 97%;
        border-right: 2px solid var(--border-toast-color);
        width: 0;
        border-top: 2px solid var(--border-toast-color);
        border-bottom: 2px solid var(--border-toast-color);
    }

    to {
        height: 100%;
        min-height: 67px;
        border-right: 2px solid var(--border-toast-color);
        width: 51%;
        border-top: 2px solid var(--border-toast-color);
        border-bottom: 2px solid var(--border-toast-color);
    }
}

#textAnimation span {
    opacity: 0;
    animation: fade-in 0s ease-in-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.mon-element-transition {
    transition: transform 0.3s ease, opacity 0.17s ease;
}

.mon-element-cercle {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    opacity: 1;
    transition: transform 0.6s ease, opacity 1s ease;
}

.mon-element-cercle svg {
    display: block;
}

.mon-element-cercle div {
    display: none;
}

.animation-spawn-first-card {
    transition: all 0.2s ease-in;
}

.animation-spawn-second-card {
    /* transition: all 10s ease-in-out; */
}

.animation-end-second-card {
    transition: all 1s ease-in-out;
}

/* On décale l'élément de -100% vers le haut par défaut */
.mon-element-decale {
    transform: translateY(50%);
    opacity: 1;
}
</style>
<!--
    text-slate-500
    text-gray-500
    text-zinc-500
    text-neutral-500
    text-stone-500
    text-red-500
    text-orange-500
    text-amber-500
    text-yellow-500
    text-lime-500
    text-green-500
    text-emerald-500
    text-teal-500
    text-cyan-500
    text-sky-500
    text-blue-500
    text-indigo-500
    text-purple-500
    text-fuchsia-500
    text-pink-500
    text-rose-500
 -->
