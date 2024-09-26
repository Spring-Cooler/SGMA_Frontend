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
import { defineProps, defineEmits, computed } from 'vue';
import ScheduleListItem from './ScheduleListItem.vue'; // Import the new component

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

// Emit close event
const emit = defineEmits(['close']);

// Modal close function
const closeModal = () => {
  emit('close');
};

// Create schedule function
const createSchedule = () => {
  alert(`Creating new schedule for ${props.selectedDate.toDateString()}`);
};

// Format date for display
const formatDate = (date) => {
  if (!date) return 'Invalid Date';
  return date.toDateString();
};

// Computed property to get sorted events by startTime and endTime
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

// Handle event modification
const onModify = (event) => {
  alert(`Modify event: ${event.title}`);
  // Implement the modification logic here
};

// Handle event removal
const onRemove = (event) => {
  if (confirm(`Are you sure you want to remove the event: ${event.title}?`)) {
    const index = props.events.indexOf(event);
    if (index > -1) {
      props.events.splice(index, 1); // Remove the event from the list
    }
  }
};
</script>

<style scoped>
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
  /* height: 60%; */
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
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

.modal-footer {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn:hover {
  background-color: #45a049;
}

.btn.olive {
  background-color: #8bc34a;
}

.btn.olive:hover {
  background-color: #7aae42;
}
</style>
