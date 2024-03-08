<template>
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="eventModalLabel">Create New Event </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <EventForm />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
setup(){
return{}
}
}
</script>


<style lang="scss" scoped>

</style>