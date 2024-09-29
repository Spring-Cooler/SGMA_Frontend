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
            <ScheduleListItem v-for="event in sortedEvents" :key="event.schedule_id" :event="event" @modify="onModify"
              @remove="onRemove" />
          </ul>
        </div>
        <div v-else>
          <p>No events scheduled for this day.</p>
        </div>

        <!-- Create or Modify Schedule Form -->
        <CreateScheduleComponent v-if="showCreateForm || eventToEdit" :initial-event="eventToEdit"
          @add-schedule="addSchedule" @update-schedule="updateSchedule" @close="closeCreateForm" />

        <!-- Create Schedule Button -->
        <div class="modal-footer">
          <button class="btn popsicle" @click="openCreateForm">
            Create Schedule
          </button>
          <button class="btn olive" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import ScheduleListItem from './ScheduleListItem.vue';
import CreateScheduleComponent from './CreateScheduleComponent.vue';

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

const emit = defineEmits(['close']);

const router = useRouter();
const showCreateForm = ref(false);
const eventToEdit = ref(null); // Store the event being edited

// Reactive local copy of the events array
const eventList = ref([...props.events]);

// Watch for changes in props.events and update local eventList accordingly
watch(() => props.events, (newEvents) => {
  eventList.value = [...newEvents];
}, { immediate: true });

const closeModal = () => {
  emit('close');
};

const formatDate = (date) => {
  if (!date) return 'Invalid Date';
  return date.toDateString();
};

const sortedEvents = computed(() => {
  return eventList.value.slice().sort((a, b) => {
    const timeA = a.startTime.split(':').map(Number);
    const timeB = b.startTime.split(':').map(Number);
    const endTimeA = a.endTime.split(':').map(Number);
    const endTimeB = b.endTime.split(':').map(Number);

    const compareStart = timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    if (compareStart !== 0) return compareStart;

    return endTimeA[0] * 60 + endTimeA[1] - (endTimeB[0] * 60 + endTimeB[1]);
  });
});

// Open create form for a new event
const openCreateForm = () => {
  eventToEdit.value = null; // Reset the event to edit
  showCreateForm.value = true;
};

// Handle modifying an existing event
const onModify = (event) => {
  eventToEdit.value = { ...event }; // Clone the event to edit
  console.log(eventToEdit.value);
  showCreateForm.value = false;
};

// Update event after modification
const updateSchedule = (updatedEvent) => {
  const index = eventList.value.findIndex(event => event.id === updatedEvent.id);
  if (index !== -1) {
    eventList.value[index] = updatedEvent; // Replace the event in the list
  }
  closeCreateForm();
};

const onRemove = (event) => {
  if (confirm(`Are you sure you want to remove the event: ${event.title}?`)) {
    const index = eventList.value.indexOf(event);
    if (index > -1) {
      eventList.value.splice(index, 1);
    }
  }
};

const addSchedule = (newEvent) => {
  eventList.value.push(newEvent);
  closeCreateForm();
};

const closeCreateForm = () => {
  showCreateForm.value = false;
  eventToEdit.value = null; // Reset the event to edit
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

.btn {
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
