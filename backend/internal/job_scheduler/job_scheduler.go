package job_scheduler

import (
	"github.com/go-co-op/gocron/v2"
)

type JobScheduler struct {
	scheduler gocron.Scheduler
}

func New() (*JobScheduler, error) {
	s, err := gocron.NewScheduler()

	if err != nil {
		return nil, err
	}

	return &JobScheduler{
		scheduler: s,
	}, nil
}
