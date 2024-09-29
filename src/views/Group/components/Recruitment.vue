<template>
    <div class="recruitment">
        <section class="left-section">
            <div class="recruitment-status active" v-if="props.data.active_status==='ACTIVE'">
                <span>모집중</span>
            </div>
            <div class="recruitment-status inactive" v-else>
                <span>모집완료</span>
            </div>
        </section>
        <section class="mid-section">
            <section class="mid-top-section">
                <div class="recruitment-title">{{props.data.title}}</div>
                <div class="recruitment-content">{{props.data.content}}</div>
            </section>
            <section class="mid-bottom-section">
                <div class="study-group-member-count">
                    <i class="fa-solid fa-user"></i>
                    <span>5</span>
                </div>
                <div class="study-group-owner">
                    <span>그룹장:</span>
                    <span>{{props.data.group_id}}</span>
                </div>
                <div class="recruitment-created-at">{{getTimeDifference(props.data.created_at)}}</div>
            </section>
        </section>
        <section class="right-section">
            <div class="recruitment-category">{{props.data.study_group_category_id}}</div>
            <div class="like-count">
                <i class="fa-regular fa-heart"></i>
                <span>{{props.data.likes}}</span>
            </div>
        </section>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })

    // 시간을 계산하여 "몇 분 전", "몇 시간 전", "몇 일 전" 등으로 표시하는 함수
    const getTimeDifference = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        
        const diffInSeconds = Math.floor((now - createdDate) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        
        if (diffInSeconds < 60) {
          return `${diffInSeconds}초 전`;
        } else if (diffInMinutes < 60) {
          return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
          return `${diffInHours}시간 전`;
        } else {
          return `${diffInDays}일 전`;
        }
    };
</script>

<style scoped>
    .recruitment {
        display: flex;
        width: 100%;
        height: 16rem;
        align-items: center;
        font-size: 2.4rem;
        margin-top: 4rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #a6a6a6;
    }

    .left-section {
        display: flex;
        flex-direction: column;
        width: 10%;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
    }

    .recruitment-status {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7.2rem;
        height: 3.2rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: #ffffff;
        border-radius: 1rem;
    }

    .active {
        background-color: #A1B872;
    }

    .inactive {
        background-color: #a6a6a6;
    }

    .mid-section {
        display: flex;
        width: 82%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
    }

    .mid-top-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .recruitment-title {
        font-size: 2.4rem;
        font-weight: 700;
        width: 50%;
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
    }

    .recruitment-content {
        font-size: 2rem;
        color: #8c8c8c;
        width: 50%;
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
    }

    .mid-bottom-section {
        display: flex;
        gap: 2rem;
        font-size: 1.5rem;
        color: #a6a6a6;
    }

    .study-group-member-count {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
    }

    .study-group-owner {
        display: flex;
        gap: 0.8rem;
    }

    .right-section {
        display: flex;
        flex-direction: column;
        width: 8%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .recruitment-category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5.4rem;
        height: 3.2rem;
        background-color: #E9EFF4;
        font-size: 1.5rem;
        border-radius: 1rem;
    }

    .like-count {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.5rem;
        color: #a6a6a6;
    }
</style>