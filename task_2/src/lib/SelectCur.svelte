<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()
    export let initial: string;

    const supported = [
        ["USD", "Доллар США"],
        ["EUR", "Евро"],
        ["RUB", "Российский рубль"],
        ["BYN", "Белорусский рубль"],
        ["UAH", "Гривна"],
        ["KZT", "Тенге"],
        ["JPY", "Иена"],
        ["CNY", "Юань"],
        ["BRL", "Бразильский реал"],
        ["TRY", "Турецкая лира"],
        ["GBP", "Фунт стерлингов"],
        ["INR", "Индийская рупия"],
        ["AED", "Дирхам (ОАЭ)"],
    ];
</script>

<select value={initial} on:change={(e) => dispatch('change', e.currentTarget.value)}>
    {#each supported as currency}
        <option value={currency[0]}>
            {currency[1]}
        </option>
    {/each}
</select>

<style>
    select {
        background-color: var(--dark-color);
        color: var(--text-color);

        border: none;
        width: 100%;
        font-size: 1rem;
        border-radius: 0.5rem;
        padding: 8px;
        transition: 200ms;
    }
    select:hover {
        opacity: 0.8;
    }
</style>
