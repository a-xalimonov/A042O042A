<script lang="ts">
    import SelectCur from "./lib/SelectCur.svelte";
    import arrowSvg from "./assets/arrow.svg";

    let cur1 = "USD",
        cur2 = "RUB",
        val1: number,
        val2: number,
        rates: { [code: string]: number };

    const convert = (forward: boolean) => {
		if (forward) {
			val2 = Math.round(val1 * rates[cur2] / rates[cur1] * 100) / 100;
		} else {
			val1 = Math.round(val2 * rates[cur1] / rates[cur2] * 100) / 100;
		}
    };

    const handleInput = (newValue: number, first: boolean) => {
        if (first) {
            val1 = Math.round(newValue * 100) / 100;
        } else {
            val2 = Math.round(newValue * 100) / 100;
        }
		convert(first);
    };

    const handleSelect = (newCurrency: string, first: boolean) => {
        if (first) {
            cur1 = newCurrency;
        } else {
            cur2 = newCurrency;
        }
        convert(true);
    };

    const swapCurrencies = () => {
        [cur1, cur2] = [cur2, cur1];
        [val1, val2] = [val2, val1];
    };

    fetch("https://open.er-api.com/v6/latest/USD")
        .then((response) => response.json())
        .then((json) => {
            rates = json.rates;
            val1 = 1;
            convert(true);
        });
</script>

<div class="app">
    <header>КОНВЕРТЕР ВАЛЮТ</header>
    <main>
        {#if rates}
            <div class="converter-block">
                <SelectCur initial={cur1} on:change={(e) => handleSelect(e.detail, true)} />
                <input
                    min="0"
                    type="number"
                    bind:value={val1}
                    on:input={(e) => handleInput(parseFloat(e.currentTarget.value), true)}
                />
            </div>
            <button on:click={swapCurrencies}>
                <img class="arrow" src={arrowSvg} alt="Двойная стрелка" />
            </button>
            <div class="converter-block">
                <SelectCur initial={cur2} on:change={(e) => handleSelect(e.detail, false)} />
                <input
                    min="0"
                    type="number"
                    bind:value={val2}
                    on:input={(e) => handleInput(parseFloat(e.currentTarget.value), false)}
                />
            </div>
        {:else}
            <p>Загрузка данных...</p>
        {/if}
    </main>
</div>

<style>
    .app {
        background-color: var(--light-color);
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        box-sizing: border-box;
        color: var(--text-color);
    }
    header {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    button {
        background-color: transparent;
        border: none;
    }
    .arrow {
        width: 70px;
        transition: 200ms;
    }
    .arrow:hover {
        cursor: pointer;
        opacity: 0.5;
    }
    main {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .converter-block {
        max-width: 500px;
    }
    @media (max-width: calc(4rem + 500px)) {
        main {
            flex-direction: column;
        }
    }
    .converter-block > * {
        display: block;
    }
    input[type="number"] {
        background-color: var(--dark-color);
        color: var(--text-color);
        font-size: 3rem;
        width: 100%;
        margin-top: 20px;
        padding: 12px;
        box-sizing: border-box;
        border: none;
        border-radius: 0.5rem;
        transition: 200ms;
    }
    input:hover {
        opacity: 0.8;
    }
    input[type="number"]::-webkit-inner-spin-button {
        display: none;
    }
</style>
