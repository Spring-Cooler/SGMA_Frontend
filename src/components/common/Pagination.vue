<template>
    <div class="pagination">
        <button class="prev" @click="prevPage" :disabled="props.data.page_no === 1 || typeof props.data.page_no === 'undefined'">
            <i class="fa-solid fa-caret-left"></i>
        </button>
        <span>{{ props.data.page_no }} / {{ props.data.end_page }}</span>
        <button class="next" @click="nextPage" :disabled="props.data.page_no === props.data.end_page || typeof props.data.page_no === 'undefined'">
            <i class="fa-solid fa-caret-right"></i>
        </button>
    </div>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

console.log(props.data.end_page);

const emit = defineEmits();

// 페이지 이동 함수
const nextPage = () => {
    if (props.data.page_no < props.data.end_page) {
        emit('changePage', props.data.page_no + 1); // 페이지를 변경하라는 이벤트를 emit
    }
};

const prevPage = () => {
    if (props.data.page_no > 1) {
        emit('changePage', props.data.page_no - 1); // 페이지를 변경하라는 이벤트를 emit
    }
};

</script>

<style>
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .prev, .next {
        border: none;
        background-color: transparent;
    }

    .pagination i {
        font-size: 3.5rem;
    }

    .pagination span {
        font-size: 3rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
</style>