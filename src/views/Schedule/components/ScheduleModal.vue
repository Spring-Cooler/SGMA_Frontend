<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2>SGMA</h2>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <!-- Date Title -->
        <h2>{{ formatDate(selectedDate) }}</h2>

        <!-- Event List -->
        <div v-if="sortedEvents.length">
          <ul class="event-list">
            <ScheduleListItem v-for="event in sortedEvents" :key="event.id" :event="event" @modify="onModify"
              @remove="onRemove" />
          </ul>
        </div>
        <div v-else>
          <p>No events scheduled for this day.</p>
        </div>

        <!-- Create Schedule Button -->
        <div class="modal-footer">
          <button class="btn sprout" @click="createSchedule">Create Schedule</button>
          <button class="btn olive" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'; // Vue Router 사용을 위해 import
import ScheduleListItem from './ScheduleListItem.vue'; // ScheduleListItem 컴포넌트 import

// Define props
const props = defineProps({
  selectedDate: {
    type: Date,
    required: true,
  },
  events: {
    type: Array,
    default: () => [],
  },
});

// Define emits
const emit = defineEmits(['close']);

// Vue Router 사용 설정
const router = useRouter();

// 모달 닫기 함수
const closeModal = () => {
  emit('close');
};

// 스케줄 생성 함수
const createSchedule = () => {
  alert(`Creating new schedule for ${props.selectedDate.toDateString()}`);
};

// 날짜 포맷팅 함수
const formatDate = (date) => {
  if (!date) return 'Invalid Date';
  return date.toDateString();
};

// 정렬된 이벤트 리스트 계산
const sortedEvents = computed(() => {
  return props.events.slice().sort((a, b) => {
    const timeA = a.startTime.split(':').map(Number);
    const timeB = b.startTime.split(':').map(Number);
    const endTimeA = a.endTime.split(':').map(Number);
    const endTimeB = b.endTime.split(':').map(Number);

    const compareStart = timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    if (compareStart !== 0) return compareStart;

    return endTimeA[0] * 60 + endTimeA[1] - (endTimeB[0] * 60 + endTimeB[1]);
  });
});

// 이벤트 수정 함수
const onModify = (event) => {
  // 직접 이동하지 않고 부모로 이벤트를 전달
  alert(`Modify event: ${event.title}`);
};

// 이벤트 제거 함수
const onRemove = (event) => {
  if (confirm(`Are you sure you want to remove the event: ${event.title}?`)) {
    const index = props.events.indexOf(event);
    if (index > -1) {
      props.events.splice(index, 1); // 이벤트 리스트에서 제거
    }
  }
};
</script>

<style scoped>
/* 스타일 코드 그대로 유지 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 80%;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.modal-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #8bc34a;
}

.modal-body h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.event-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.event-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}

.event-details {
  flex: 1;
  margin-right: 1rem;
  font-size: 1.4rem;
}

.event-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.btn.modify {
  color: white;
}

.btn.modify:hover {
  background-color: #0069d9;
}

.btn.remove {
  background-color: orange;
  color: white;
}

.btn.remove:hover {
  background-color: #c82333;
}

.modal-footer {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn.sprout {
  background-color: #8bc34a;
  color: white;
}

.btn.olive {
  background-color: #607d8b;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
