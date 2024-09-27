<template>
    <div class="notice">
        <div class="notice-no">10</div>
        <div class="notice-title">공지사항 안내입니다.</div>
        <div class="notice-created-at">2024.09.19</div>
    </div>
</template>

<style>
    .notice {
        display: flex;
        height: 9.2rem;
        width: 100%;
        align-items: center;
        font-size: 2rem;
        font-weight: 500;
    } 

    .notice-no {
        display: flex;
        width: 10%;
        justify-content: center;
        align-items: center;
    }

    .notice-title {
        display: flex;
        width: 75%;
        justify-content: center;
        align-items: center;
    } 

    .notice-created-at {
        display: flex;
        width: 15%;
        justify-content: center;
        align-items: center;
    }
</style>