<template>
    <div class="member">
        <img src="../../../assets/images/default_profile.svg" alt="profile">
        <span><slot></slot></span>
        <i class="fa-solid fa-crown"></i>
    </div>
</template>

<style>
    .member {
        display: flex;
        align-items: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid #EAECEE;
    }

    .member span {
        font-size: 2rem;
        padding-left: 1.2rem;
    }

    .member i {
        font-size: 2rem;
        padding-left: 1rem;
    }
</style>