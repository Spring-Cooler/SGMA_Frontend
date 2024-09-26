<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Close Button -->

      <!-- Modal Header -->
      <div class="modal-header">
        <h2>SGMA</h2>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <!-- Date Title -->
        <h2>{{ formatDate(selectedDate) }}</h2>

        <!-- Event List -->
        <div v-if="events && events.length">
          <ul class="event-list">
            <li v-for="event in events" :key="event.id">
              <strong>{{ event.title }}</strong> - {{ event.details }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No events scheduled for this day.</p>
        </div>

        <!-- Create Schedule Button -->
        <div class="modal-footer">
          <button class="btn" @click="createSchedule">Create Schedule</button>
          <button class="btn olive" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define props with default values
const props = defineProps({
  selectedDate: {
    type: Date,
    required: true,
  },
  events: {
    type: Array,
    default: () => []
  }
});

// Debugging selectedDate and events values
console.log('selectedDate:', props.selectedDate);
console.log('events:', props.events);

// Emit close event
const emit = defineEmits(['close']);

// Modal close function
const closeModal = () => {
  emit('close');
};

// Create schedule function
const createSchedule = () => {
  alert(`Creating new schedule for ${props.selectedDate.toDateString()}`);
  // Emit an event or handle schedule creation here
};

// Format date for display
const formatDate = (date) => {
  if (!date) return 'Invalid Date';
  return date.toDateString();
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
  width: 500px;
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

.event-list li {
  font-size: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}

.modal-footer {
  margin-top: 1.5rem;
  display: flex;
  /* Corrected flexbox to flex */
  justify-content: flex-end;
  /* Aligned items to the right */
  gap: 1rem;
  /* Added space between buttons */
}

.btn {
  background-color: #4CAF50;
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
